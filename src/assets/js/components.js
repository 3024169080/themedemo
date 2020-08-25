import imageRow from "@/components/theme/imageRow/index.js";
import imageText from "@/components/theme/imageText/index.js";
import pureText from "@/components/theme/pureText/index.js";
import goodsList from "@/components/theme/goodsList/index.js";
const components = [imageRow, imageText, pureText, goodsList];

// 注册组件
const install = (Vue, opt) => {
  // console.log(opt,'----------------opt');
  Vue.prototype.$opt = opt;
  components.map(component => {
    Vue.component(component.name, component);
  });
};
export default {
  install
};
