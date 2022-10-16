import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'uno.css'
import i18n from './modules/i18n'
import './components/iconfont.js'
// document.body.append((() => {
//    const tmp = document.createElement('div')
//    tmp.innerHTML = `
//    <svg viewBox="0 0 8 2" xmlns="http://www.w3.org/2000/svg">
//      <!-- Our symbol in its own coordinate system -->
//      <symbol id="test" width="20" height="10" viewBox="0 0 2 2">
//        <circle cx="1" cy="1" r="1" />
//      </symbol>
//    </svg>
//    `
//   return tmp.children[0]
// })())


createApp(App)
  .use(i18n)
  .use(router)
  .mount('#app')
