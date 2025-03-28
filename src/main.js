import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia';
import helpers from '@/utils/helpers'
import i18n from '@/plugins/i18n'
import veeValidate from '@/plugins/vee-validate';
import {PerfectScrollbarPlugin} from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/style.css';
import ElementPlus from 'element-plus'
import vi from 'element-plus/es/locale/lang/vi'
import 'element-plus/dist/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(ElementPlus, {
  locale: vi,
})
app.use(helpers)
app.use(i18n)
app.use(veeValidate)
app.use(PerfectScrollbarPlugin);
app.mount('#app');
