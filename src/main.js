import Vue from 'vue'
import App from './App.vue'
import ElementUI, { Message, MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.prototype.$message = Message
Vue.prototype.$comfirm = MessageBox.confirm
Vue.use(ElementUI)
new Vue({
  render: h => h(App),
}).$mount('#app')
