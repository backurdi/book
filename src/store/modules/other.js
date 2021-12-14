import storePlugins from "../../plugins/storePlugin";

export const getDefaultState = () => {
  return {
    isNavOpen: false,
  };
};

const otherStore = {
  namespaced: true,
  plugins: [storePlugins],
  state: getDefaultState(),
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
    resetState(state) {
      Object.assign(state, getDefaultState());
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
