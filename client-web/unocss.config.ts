import { defineConfig, presetAttributify, presetUno } from "unocss";

export default defineConfig({
  shortcuts: [
    ['checkbox', 'inline-block w-16px h-16px border border-2 rounded-md color-black cursor-pointer'],
  ],
  theme: {
    colors: {
      'black': '#333333',
      'regular': '#666666'
    }
  },
  presets: [
    presetUno(),
    presetAttributify()
  ]
})