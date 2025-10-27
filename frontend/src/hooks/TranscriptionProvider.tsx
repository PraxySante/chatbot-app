import { useContext } from "react";
import { TranscriptionContext } from "../context/TranscriptionContext";

export default function useTranscription() {
  const context = useContext(TranscriptionContext);
  if (!context) {
    throw new Error("Not included Transcription function");
  }
  return context
}