import storePlugins from "../../plugins/storePlugin";

const otherStore = {
  namespaced: true,
  plugins: [storePlugins],
  state: () => ({
    isNavOpen: false,
  }),
  mutations: {
    toggleNav(state) {
      debugger;
      state.isNavOpen = !state.isNavOpen;
    },
  },
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
