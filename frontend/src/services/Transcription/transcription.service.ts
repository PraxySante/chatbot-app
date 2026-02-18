import axios, { AxiosResponse } from 'axios';
import axiosAuthSecret from '../axiosConfiguration/axiosAuthSecret.service';
import { ReponseFailureType } from '../../types/chatbot/chatbot.type';

export async function startTranscription(authToken: string): Promise<any> {
  try {
    const url =
      process.env.TRANSCRIPTION_BACKEND_ENDPOINT + '/transcribe/start';
    return axios.get(url, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  } catch (error: any) {
    console.error(error);
    return { status: error.status, message: error.message };
  }
}

export async function transcribeAudio(
  audioFloatArray: Float32Array,
  uuidSession: string,
  language: string
): Promise<string | ReponseFailureType> {
  // Convertir Float32Array en Blob WAV
  const wavBlob = createWavBlob(audioFloatArray);

  // Convertir le Blob en Base64
  const audioBase64 = await blobToBase64(wavBlob);

  try {
    const response: AxiosResponse = await axiosAuthSecret.post(
      '/transcribe-audio',
      {
        audioBase64: audioBase64,
        uuidSession: uuidSession,
        language: language,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.status === 200
      ? response.data
      : (response.data as ReponseFailureType);
  } catch (error: any) {
    console.error('transcribeAudio error:', error?.message || error);
    return {
      message: 'failure',
      details: error?.message,
    } as ReponseFailureType;
  }
}

// Fonction utilitaire pour convertir Blob en Base64
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1]; // Enlever le préfixe data:
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Fonction simple pour créer un WAV
function createWavBlob(audioData: Float32Array): Blob {
  const length = audioData.length;
  const buffer = new ArrayBuffer(44 + length * 2);
  const view = new DataView(buffer);

  // En-tête WAV minimal
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + length * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, 16000, true);
  view.setUint32(28, 32000, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, length * 2, true);

  // Convertir les données audio
  let offset = 44;
  for (let i = 0; i < length; i++) {
    const sample = Math.max(-1, Math.min(1, audioData[i]));
    view.setInt16(offset, sample * 0x7fff, true);
    offset += 2;
  }

  return new Blob([buffer], { type: 'audio/wav' });
}
