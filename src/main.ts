import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import i18n from "@/commons/i18n/i18n";
import { vueSetupValidation } from "@/commons/validation/validation";

Vue.config.productionTip = false

vueSetupValidation();


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app")
