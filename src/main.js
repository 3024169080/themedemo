import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./static/css/common.css";
import "./static/css/color.css";
import "./static/css/global.css";

import "./plugins/element.js";

import Vant from "vant";
import "vant/lib/index.css";

import "@vant/touch-emulator";

Vue.use(Vant);

import componentsList from "@/assets/js/components";
import componentData from "@/assets/js/componentData";
let opts = componentData;
Vue.use(componentsList, opts);

import { DFSImg } from "@/filters/index";
//定义一个图片过滤器(双向绑定)
Vue.filter("DFSImg", DFSImg);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
