import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./static/css/common.css";
import "./static/css/color.css";

import "./plugins/element.js";

import componentsList from "@/assets/js/components";
Vue.use(componentsList);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
