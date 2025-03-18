import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [`${process.env.VITE_HOST}`],
    host: true,
    port: Number(process.env.VITE_PORT), // Utilise le port défini dans .env
  },
  preview: {
    port: Number(process.env.VITE_PORT), // Idem pour le port de preview
  },
  build: {
    chunkSizeWarningLimit: 1000, // Par exemple, augmenter la limite à 1 Mo
  }
});
