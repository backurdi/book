import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import AppLayout from "./layouts/appLayout.vue";

import "./styling/tailwind.css";
import "./styling/_variables.scss";

createApp(App).use(store).use(router).component("AppLayout", AppLayout).mount("#app");
