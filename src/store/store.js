import { createStore } from "vuex";
import storePlugins from "../plugins/storePlugin";
import {mutations} from './mutations';
import {actions} from './actions';
import {getDefaultState} from './helpers';


const store = createStore({
  plugins: [storePlugins],
  state: getDefaultState(),
  mutations,
  actions
});

export default store;
