
const messages = Object.fromEntries(
  Object
    .entries(import.meta.glob('../../locales/*.json', { eager: true }))
    .map(([key, value]) => {
      
      return [key.slice(key.lastIndexOf('/') + 1, -5), value.default]
    })
)

import { createI18n } from "vue-i18n";

const i18n = createI18n({
  locale: 'chs',
  legacy: false,
  messages
})

export default i18n
