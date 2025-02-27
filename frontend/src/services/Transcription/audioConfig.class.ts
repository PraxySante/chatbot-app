export class AudioConfigClass {
  protected context!: AudioContext;
  protected globalStream: any;
  protected websocket!: WebSocket;
  protected selectAudioInput!: string;

  constructor(websocket: WebSocket, selectAudioInput: string) {
    this.selectAudioInput = selectAudioInput;
    this.websocket = websocket;
    this.context = new AudioContext();
  }

  startAudioConfig() {
    let onSuccess = async (stream: any) => {
      // Push user config to server
      this.globalStream = stream;
      const input = this.context.createMediaStreamSource(stream);
      const recordingNode = await this.setupRecordingWorkletNode();
      recordingNode.port.onmessage = (event) => {
        this.processAudio(event.data);
      };
      input.connect(recordingNode);
    };
    let onError = (error: any) => {
      console.error(error);
    };
    navigator.mediaDevices
      .getUserMedia({
        audio: {
          deviceId: { exact: this.selectAudioInput },
          echoCancellation: true,
          autoGainControl: false,
          noiseSuppression: true,
          //latency: 0,
        },
      })
      .then(onSuccess, onError);
  }

  stopAudioConfig() {
    // Arrêter les pistes audio du stream
    if (this.globalStream) {
      const tracks = this.globalStream.getTracks();
      tracks.forEach((track: MediaStreamTrack) => {
        track.stop();
      });
      this.globalStream = null;
    }

    // Fermer le contexte audio
    if (this.context.state !== 'closed') {
      this.context.close();
    }

    // Fermer la connexion WebSocket si nécessaire
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      // Si vous voulez fermer le WebSocket (si dédié uniquement à l'audio)
      this.websocket.close();
    }
  }

  async setupRecordingWorkletNode() {
    await this.context.audioWorklet.addModule('./audio-processor.js');

    return new AudioWorkletNode(this.context, 'audio-processor');
  }

  processAudio(sampleData: any) {
    // ASR (Automatic Speech Recognition) and VAD (Voice Activity Detection)
    // models typically require mono audio with a sampling rate of 16 kHz,
    // represented as a signed int16 array type.
    //
    // Implementing changes to the sampling rate using JavaScript can reduce
    // computational costs on the server.
    const outputSampleRate = 16000;
    const decreaseResultBuffer = this.decreaseSampleRate(
      sampleData,
      this.context.sampleRate,
      outputSampleRate
    );
    const audioData = this.convertFloat32ToInt16(decreaseResultBuffer);

    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(audioData);
    }
  }

  decreaseSampleRate(buffer: any, inputSampleRate: any, outputSampleRate: any) {
    if (inputSampleRate < outputSampleRate) {
      console.error('Sample rate too small.');
      return;
    } else if (inputSampleRate === outputSampleRate) {
      return;
    }

    let sampleRateRatio = inputSampleRate / outputSampleRate;
    let newLength = Math.ceil(buffer.length / sampleRateRatio);
    let result = new Float32Array(newLength);
    let offsetResult = 0;
    let offsetBuffer = 0;
    while (offsetResult < result.length) {
      let nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
      let accum = 0,
        count = 0;
      for (
        let i = offsetBuffer;
        i < nextOffsetBuffer && i < buffer.length;
        i++
      ) {
        accum += buffer[i];
        count++;
      }
      result[offsetResult] = accum / count;
      offsetResult++;
      offsetBuffer = nextOffsetBuffer;
    }
    return result;
  }

  convertFloat32ToInt16(buffer: any) {
    let l = buffer.length;
    const buf = new Int16Array(l);
    while (l--) {
      // Add a tiny epsilon to handle floating point errors
      const sample = Math.max(-1.0, Math.min(1.0, buffer[l]));
      // Scale to Int16 range and round to prevent floating point errors
      buf[l] = Math.round(sample * 0x7fff);
    }
    return buf.buffer;
  }
}
