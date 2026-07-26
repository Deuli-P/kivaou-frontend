import { defineConfig } from 'vite'
import compression from 'vite-plugin-compression';
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), compression(), cloudflare()],
})