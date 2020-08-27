import Vue from "vue";
// import "element-ui/lib/theme-chalk/index.css";
import {
  Radio,
  Breadcrumb,
  BreadcrumbItem,
  Pagination,
  Input,
  Checkbox,
  Tooltip,
  Tabs,
  TabPane,
  Dialog,
  Table,
  TableColumn,
  Step,
  Steps,
  Form,
  FormItem,
  Select,
  Button,
  PageHeader,
  Message,
  MessageBox,
  Image,
  Loading,
  Option,
  OptionGroup,
  Progress,
  Row,
  ColorPicker,
  Slider,
  Collapse,
  CollapseItem
} from "element-ui";

import "@/assets/scss/element-variables.scss"; 

Vue.use(Radio)
  .use(Breadcrumb)
  .use(BreadcrumbItem)
  .use(Pagination)
  .use(Input)
  .use(Checkbox)
  .use(Tooltip)
  .use(Tabs)
  .use(TabPane)
  .use(Dialog)
  .use(Table)
  .use(TableColumn)
  .use(Step)
  .use(Steps)
  .use(Form)
  .use(FormItem)
  .use(Select)
  .use(Button)
  .use(PageHeader)
  .use(Image)
  .use(Loading)
  .use(Option)
  .use(OptionGroup)
  .use(Progress)
  .use(Row)
  .use(Slider)
  .use(Collapse)
  .use(CollapseItem)
  .use(ColorPicker);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
