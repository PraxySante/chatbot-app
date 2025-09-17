export class AudioConfigClass {
  protected context!: AudioContext;
  protected globalStream: any;
  protected websocket!: WebSocket;
  protected selectAudioInput!: string;
  protected isMuted: boolean = false;

  protected refreshRate: number = 20;
  protected refreshCurrentTime: number = 0;
  protected refreshPreviousTime: number = 0;
  protected refreshData: Int16Array = new Int16Array(0);

  constructor(websocket: WebSocket, selectAudioInput: string) {
    this.selectAudioInput = selectAudioInput;
    this.websocket = websocket;
    this.context = new AudioContext();
  }

  startAudioConfig(): Promise<void> {
    return new Promise((resolve, reject) => {
      let onSuccess = async (stream: MediaStream) => {
        this.globalStream = stream;
        const input = this.context.createMediaStreamSource(stream);
        const recordingNode = await this.setupRecordingWorkletNode();
        recordingNode.port.onmessage = (event) => {
          if(!this.isMuted)
          this.processAudio(event.data);
        };
        input.connect(recordingNode);
        resolve();
      };
  
      let onError = (error: any) => {
        console.error(error);
        reject(error);
      };
  
      navigator.mediaDevices
        .getUserMedia({
          audio: {
            deviceId: { exact: this.selectAudioInput },
            echoCancellation: true,
            autoGainControl: false,
            noiseSuppression: true,
          },
        })
        .then(onSuccess)
        .catch(onError);
    });
  }

  hasMutedMicrophone(hasMuted: boolean) {
    this.isMuted = hasMuted;
    if (this.globalStream && this.globalStream.getAudioTracks()[0]) {      
      this.globalStream.getAudioTracks()[0].enabled = !hasMuted;
    }
  }

  stopAudioConfig() {
    if (this.globalStream) {
      this.globalStream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      this.globalStream = null;
    }
    if (this.context.state !== 'closed') {
      this.context.close();
    }
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.close();
    }
  }

  async setupRecordingWorkletNode() {
    await this.context.audioWorklet.addModule('./audio-processor.js');
    return new AudioWorkletNode(this.context, 'audio-processor');
  }

  processAudio(sampleData: any) {
    const outputSampleRate = 16000;
    const decreaseResultBuffer = this.decreaseSampleRate(
      sampleData,
      this.context.sampleRate,
      outputSampleRate
    );
    const audioData = this.convertFloat32ToInt16(decreaseResultBuffer);

    // 🔹 Concaténer dans un buffer
    let l = this.refreshData.length + audioData.length;
    const buf = new Int16Array(l);
    buf.set(this.refreshData, 0);
    buf.set(audioData, this.refreshData.length);

    this.refreshData = buf;

    // 🔹 Vérifier le temps écoulé
    this.refreshCurrentTime = Date.now();
    if (this.refreshCurrentTime - this.refreshPreviousTime > this.refreshRate) {
      if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
        this.websocket.send(this.refreshData.buffer);
        this.refreshData = new Int16Array(0);
        this.refreshPreviousTime = this.refreshCurrentTime;
      }
    }
  }

  decreaseSampleRate(buffer: any, inputSampleRate: any, outputSampleRate: any) {
    if (inputSampleRate < outputSampleRate) {
      console.error('Sample rate too small.');
      return;
    } else if (inputSampleRate === outputSampleRate) {
      return buffer;
    }

    let sampleRateRatio = inputSampleRate / outputSampleRate;
    let newLength = Math.ceil(buffer.length / sampleRateRatio);
    let result = new Float32Array(newLength);
    let offsetResult = 0;
    let offsetBuffer = 0;
    while (offsetResult < result.length) {
      let nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
      let accum = 0, count = 0;
      for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
        accum += buffer[i];
        count++;
      }
      result[offsetResult] = accum / count;
      offsetResult++;
      offsetBuffer = nextOffsetBuffer;
    }
    return result;
  }

  convertFloat32ToInt16(buffer: any): Int16Array {
    let l = buffer.length;
    const buf = new Int16Array(l);
    while (l--) {
      const sample = Math.max(-1.0, Math.min(1.0, buffer[l]));
      buf[l] = Math.round(sample * 0x7fff);
    }
    return buf;
  }
}
