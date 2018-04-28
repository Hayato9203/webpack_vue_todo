import Vue from 'vue'
import App from './app.vue'

const root = document.createElement('div')
// 将app内容挂载并展示到root上面
new Vue({
  render: (h) => h(App)
}).$mount(root)