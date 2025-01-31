import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),],
  server: {
    allowedHosts:['chatbotfoch.praxysante.fr'],
    host: true,
    port: 5000,
  },
  preview: {
    port: 5000,
  },
  build: {
    chunkSizeWarningLimit: 1000, // par exemple, augmenter la limite à 1 Mo
  }
});
