import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 8000, // This is the port which we will use in docker
    // Thanks @sergiomoura for the window fix
    // add the next lines if you're using windows and hot reload doesn't work
     watch: {
       usePolling: true
     },
      '/api': {
        target: 'http://localhost:8888', // L'URL de votre serveur API
        changeOrigin: true, // Nécessaire pour les hôtes virtuels
        secure: false, // Si votre API est en https, vous pouvez vouloir activer cette option
        // rewrite: path => path.replace(/^\/api/, '') // Décommentez si vous voulez enlever /api du path.
      },
  }
 })