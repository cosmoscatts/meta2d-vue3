import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import { createApp } from 'vue';
import App from './App.vue';

import 'virtual:uno.css';
import '@arco-design/web-vue/dist/arco.css';
import './main.css';

createApp(App)
  .use(ArcoVue)
  .use(ArcoVueIcon)
  .mount('#app');
