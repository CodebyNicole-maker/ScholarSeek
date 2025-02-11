import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './environment', // if it says './env' its a typo you'll get 401 unauth error change it to './environment'
  plugins: [react()],
  server:{
    port:3000,
    open:true
  }
});