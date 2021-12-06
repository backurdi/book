import storePlugins from "../../plugins/storePlugin";

const otherStore = {
  namespaced: true,
  plugins: [storePlugins],
  state: () => ({
    isNavOpen: false,
  }),
  mutations: {
    toggleNav(state) {
      state.isNavOpen = !state.isNavOpen;
      const body = document.querySelector("body");
      if (state.isNavOpen) {
        body.classList.add("nav-is-showing");
      } else {
        body.classList.remove("nav-is-showing");
      }
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
