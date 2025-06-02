import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }: any) => {
  // Need do transform import.meta.env into process.env
  // import.meta was not supported in this file
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    server: {
      allowedHosts: ['.praxysante.fr'],
      host: true,
      port: Number(process.env.VITE_PORT),
    },
    preview: {
      port: Number(process.env.VITE_PORT),
    },
    build: {
      chunkSizeWarningLimit: 1000,
    },
    base: process.env.VITE_BASE,
  });
};
