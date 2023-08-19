import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    base: '/mrchomrurn.github.io/',
    plugins: [vue()],
  })
}
