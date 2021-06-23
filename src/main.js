import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import vuetify from '@/plugins/vuetify'
import { infoMessage, errorMessage, formatEventUbication, getCurrentDate, getMinTime, isPasswordValid } from '@/plugins/GlobalFunctions'
import Text from '@/plugins/Texts';
import Vuelidate from 'vuelidate'
import Notifications from 'vue-notification';
import 'leaflet/dist/leaflet.css';

Vue.use(Notifications);

Vue.prototype.$infoMessage = infoMessage;
Vue.prototype.$errorMessage = errorMessage;
Vue.prototype.$formatEventUbication = formatEventUbication;
Vue.prototype.$getCurrentDate = getCurrentDate;
Vue.prototype.$getMinTime = getMinTime;
Vue.prototype.$isPasswordValid = isPasswordValid;
Vue.prototype.$text = Text;

Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
