import Vue from 'vue'
import App from './App.vue'

import './assets/styles/global.styl'
const root = document.createElement('DIV')
const t = document.createTextNode("Hello World")
root.appendChild(t)
document.body.appendChild(root)

// 将app内容挂载并展示到#app上面
new Vue({
  // h意思是hyperscript: render: function (createElement) { return createElement(App) }
  render: (h) => h(App)
}).$mount(root)

