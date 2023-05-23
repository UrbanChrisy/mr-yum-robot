import { defineConfig } from 'vite'
import { defineConfig as defineConfigViTest } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(defineConfigViTest({
  plugins: [react()],
  test: {

  }
}))
