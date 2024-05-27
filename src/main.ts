import { createApp } from 'vue';

import App from './App.vue';
import { i18n } from './plugins/i18n.ts';
import router from './plugins/router.ts';

// createApp(App).use(router).use(i18n).mount('#app');
const app = createApp(App);
app.use(router);
app.use(i18n);
app.mount('#app');
