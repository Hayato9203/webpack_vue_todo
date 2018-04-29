import Vue from 'vue'
import App from './app.vue'

// import './assets/images/bg.jpg'
import './assets/styles/style.css'

const root = document.createElement('div').id('container')
document.body.appendChild(root)
// 将app内容挂载并展示到root上面
new Vue({
  // h意思是hyperscript: render: function (createElement) { return createElement(App) }
  render: (h) => h(App)
}).$mount('#container')
