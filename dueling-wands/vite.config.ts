import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Permet d'utiliser `expect` sans import explicite
    environment: 'jsdom', // Simule un environnement DOM
    setupFiles: './src/setupTests.ts', // Fichier de configuration pour les tests
  },
});
