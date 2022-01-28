import { createStore } from "vuex";
import storePlugins from "../plugins/storePlugin";
import userStore from "./modules/user";
import clubStore from "./modules/club";
import postStore from "./modules/post";
import bookStore from "./modules/book";
import otherStore from "./modules/other";

const store = createStore({
  plugins: [storePlugins],
  modules: {
    userStore,
    clubStore,
    postStore,
    bookStore,
    otherStore,
  },
});

export default store;
