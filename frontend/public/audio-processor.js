export class AudioProcessor extends AudioWorkletProcessor {
  constructor(options) {
      super();
  }

  process(inputs, outputs, params) {
      // ASR and VAD models typically require a mono audio.
      this.port.postMessage(inputs[0][0]);
      return true;
  }
}

registerProcessor('audio-processor', AudioProcessor);
