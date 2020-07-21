import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import i18n from "@/commons/i18n/i18n";
import VModal from "vue-js-modal";
import { vueSetupValidation } from "@/commons/validation/validation";
import VCalendar from "v-calendar";
import VueRx from 'vue-rx'

Vue.config.productionTip = false

vueSetupValidation();

Vue.use(VModal);
Vue.use(VCalendar);
Vue.use(VueRx)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app")
