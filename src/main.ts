import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './plugins/router.ts';
import { i18n } from './plugins/i18n.ts';

createApp(App).use(router).use(i18n).mount('#app');
