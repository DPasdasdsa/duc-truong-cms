import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import helpers from '@/utils/helpers'
import i18n from '@/plugins/i18n'
import veeValidate from '@/plugins/vee-validate';

const app = createApp(App)
app.use(router)
app.use(store)
app.use(helpers)
app.use(i18n)
app.use(veeValidate)
app.mount('#app');
