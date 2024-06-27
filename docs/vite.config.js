import { defineConfig } from 'vite'

export default defineConfig({
  ssr: { noExternal: ['naive-ui', 'vhooks'] }
})
