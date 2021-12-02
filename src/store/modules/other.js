import storePlugins from "../../plugins/storePlugin";
import { mutations } from "../mutations";

const otherStore = {
  namespaced: true,
  plugins: [storePlugins],
  state: () => ({}),
  mutations,
  actions: {
    sendEmail(_state, emailData) {
      return new Promise((resolve) => {
        this.$api.contact.post(emailData).then(() => {
          resolve("");
        });
      });
    },
    fetchGifs(_state, data) {
      return new Promise((resolve) => {
        this.$api.gif.get(data).then((res) => {
          resolve(res);
        });
      });
    },
  },
};

export default otherStore;
