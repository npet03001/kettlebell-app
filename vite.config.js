import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',   // <<< Wichtig für Vercel & GitHub Deployments
  plugins: [react()],
});
