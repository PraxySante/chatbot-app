import axios from "axios";

export const axiosTranscription = axios.create({
  baseURL: process.env.TRANSCRIPTION_BACKEND_ENDPOINT,
  headers: {
    "content-type": "application/json",
  },
});
