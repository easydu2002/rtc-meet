import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': `${resolve(__dirname, 'src')}/`,
    }
  },
  plugins: [
    vue(),
    Unocss(),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve(__dirname, 'locales/**')],
    })
  ]
})
