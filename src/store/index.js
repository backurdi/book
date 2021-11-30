import { createStore } from "vuex";
import storePlugins from "../plugins/storePlugin";
import { mutations } from "./mutations";
import { actions } from "./actions";
import userStore from "./modules/user";
import clubStore from "./modules/club";
import postStore from "./modules/post";
import bookStore from "./modules/book";

const store = createStore({
  plugins: [storePlugins],
  mutations,
  actions,
  modules: {
    userStore,
    clubStore,
    postStore,
    bookStore,
  },
});

export default store;
