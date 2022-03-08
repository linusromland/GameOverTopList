//External Dependencies import:
import { createApp } from 'vue';

//Internal Dependencies import:
import './index.scss';
import App from './App.vue';
import router from './router';

//Creats the Vue app
const app = createApp(App);

//Registers vue-router
app.use(router);

//Mounts app to div with id app
app.mount('#app');
