import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "assets": "/src/assets",
      "pages": "/src/pages",
      "components": "/src/components",
      "lib": "/src/lib",
      "store": "/src/store",
    },
  },
});
