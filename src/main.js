import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import vuetify from '@/plugins/vuetify'
import Vuelidate from 'vuelidate'
import Notifications from 'vue-notification';
import * as VueGoogleMaps from "vue2-google-maps";


Vue.use(Notifications);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBiC27nu7G3zIgZJB59eLRHTV3q5nzBRiw",
    libraries: "places" // necessary for places input
  }
});

/*import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowAltCircleRight, faArrowAltCircleLeft, faCreditCard, faFile, faUser, faSortDown, faCheck, faGraduationCap, faBars
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faArrowAltCircleRight)
library.add(faArrowAltCircleLeft)
library.add(faCreditCard)
library.add(faFile)
library.add(faUser)
library.add(faSortDown)
library.add(faCheck)
library.add(faGraduationCap)
library.add(faBars)

Vue.component('font-awesome-icon', FontAwesomeIcon)*/

/*Vue.use(Vuetify, {
  iconfont: 'md',
})*/

Vue.use(Vuelidate)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
