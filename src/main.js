import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import helpers from '@/utils/helpers'
import i18n from '@/plugins/i18n'
import veeValidate from '@/plugins/vee-validate';
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/style.css';

const app = createApp(App)
app.use(router)
app.use(store)
app.use(helpers)
app.use(i18n)
app.use(veeValidate)
app.use(PerfectScrollbarPlugin);
app.mount('#app');
