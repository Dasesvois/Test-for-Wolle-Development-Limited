import { createApp } from 'vue';
import App from './app/App.vue';
import { pinia } from './app/providers/pinia';

import './shared/styles/reset.css';
import './shared/styles/global.css';

const app = createApp(App);

app.use(pinia);
app.mount('#app');
