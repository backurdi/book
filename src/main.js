import { createApp } from "vue";
import App from "./App.vue";
import "./tailwind.css";
import router from "./router";
import store from "./store/store";
import AppLayout from "./layouts/appLayout";

createApp(App)
  .use(store)
  .use(router)
  .component("AppLayout", AppLayout)
  .mount("#app");
