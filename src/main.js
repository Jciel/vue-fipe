import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import { ElSelect, ElOption } from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

createApp(App)
  .use(store)
  .use(ElSelect)
  .use(ElOption)
  .mount('#app')
