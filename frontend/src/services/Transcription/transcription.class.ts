import { startTranscription } from './transcription.service';

export default class Transcription {
  private authToken: string = '';
  private language: string = '';
  private selectedAudioInput?: string;

  protected userUuid: string = '';
  protected transcriptionUuid: string = '';
  protected isRecording: boolean = false;
  protected devices!: MediaDevices[];
  protected wsAdress: string = '';
  protected isDictation: boolean = false;
  protected websocket?: WebSocket | undefined | null;
  protected context!: AudioContext;
  protected globalStream: any;
  protected processor: any;
  protected messagesTranscription: any;

  constructor(
    authToken: string,
    language: string,
    selectedAudioInput?: string,
    messagesTranscription?: any
  ) {
    this.authToken = authToken;
    this.language = language;
    this.selectedAudioInput = selectedAudioInput;
    this.userUuid = import.meta.env.UUID_WORD;
    this.messagesTranscription = messagesTranscription;
  }

  // Request initial permissions to get device labels
  async initializeAudioDevices() {
    try {
      // Get initial audio permission to see device labels
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop()); // Stop the test stream
      const devices = await this.populateMicrophoneList();

      const devicesAudioInput = devices
        .filter((device: any) => device.kind === 'audioinput')
        .map((device: any) => {
          return {
            id: device.deviceId,
            label: device.label || `microphone-${device.deviceId}`,
          };
        });
      return devicesAudioInput;
    } catch (error) {
      console.error('Error initializing audio devices:', error);
    }
  }

  // Function to populate the microphone dropdown
  async populateMicrophoneList(): Promise<any> {
    try {
      return await navigator.mediaDevices.enumerateDevices();
    } catch (error) {
      console.error('Error getting audio devices:', error);
    }
  }

  setAudio(selectedAudioInput: string) {
    this.selectedAudioInput = selectedAudioInput;
  }

  setLanguage(selectedLanguage: string) {
    this.language = selectedLanguage;
  }

  async setupRecordingWorkletNode() {
    await this.context.audioWorklet.addModule(
      `${window.location.origin}/assets/audio-processor.js`
    );

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

  decreaseSampleRate(
    buffer: string | any[],
    inputSampleRate: number,
    outputSampleRate: number
  ) {
    if (inputSampleRate < outputSampleRate) {
      console.error('Sample rate too small.');
      return null;
    } else if (inputSampleRate === outputSampleRate) {
      return null;
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
      buf[l] = Math.min(1, buffer[l]) * 0x7fff;
    }
    return buf.buffer;
  }

  async startTranscription(isDictation: boolean): Promise<void> {
    const response = await startTranscription(this.authToken);

    const { message, data } = response.data;

    if (data.uuid) {
      this.transcriptionUuid = data.uuid;
      this.startRecording(isDictation);
    } else {
      this.isRecording = false;
      console.log(message);
    }
  }

  getCheckRecording() {
    return this.isRecording;
  }

  startRecording(isDictation: boolean) {
    this.isRecording = true;
    this.wsAdress = `${process.env.WEBSOCKET_URL}/${this.transcriptionUuid}?token=${this.authToken}&user_uuid=${this.userUuid}&language=${this.language}`;

    if (isDictation) {
      this.wsAdress += '&dictation_mode=true';
      this.isDictation = true;
    }

    this.connectWebsocket();

    this.context = new AudioContext();

    let onSuccess = async (stream: MediaStream) => {
      console.log('🚀 ~ onSuccess ~ stream:', stream);
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
          deviceId: { exact: this.selectedAudioInput },
          echoCancellation: true,
          autoGainControl: false,
          noiseSuppression: true,
        },
      })
      .then(onSuccess, onError);
  }

  connectWebsocket() {
    if (!this.wsAdress) {
      console.log('WebSocket address is required.');
      return;
    }

    this.websocket = new WebSocket(this.wsAdress);
    this.websocket.onmessage = (e) => {
      this.messagesTranscription(JSON.parse(e.data));
    };

    this.websocket.onclose = () => {
      console.log('WebSocket closed');
      this.stopRecording();
    };

    this.websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.stopRecording();
    };
  }

  stopRecording() {
    if (!this.isRecording) return;
    this.isRecording = false;

    if (this.websocket) {
      this.websocket.close();
    }

    if (this.globalStream) {
      this.globalStream.getTracks().forEach((track: any) => track.stop());
    }
    if (this.processor) {
      this.processor.disconnect();
      this.processor = null;
    }
    if (this.context) {
      this.context.close();
    }
    this.websocket = null;
  }
}
