import storePlugins from "../../plugins/storePlugin";

const clubStore = {
  namespaced: true,
  plugins: [storePlugins],
  state: () => ({
    clubs: [],
    activeClub: {},
  }),
  mutations: {
    insertClub(state, club) {
      state.clubs.push(...club);
    },
    setActiveClub(state, club) {
      state.activeClub = club;
      const clubArrInstance = state.clubs.find((clubInstance) => clubInstance._id === club._id);

      if (!clubArrInstance?.books) {
        state.clubs[state.clubs.indexOf(clubArrInstance)] = club;
      }

      this.commit("bookStore/setBooks", club.books);
      this.commit(
        "postStore/setPosts",
        club.posts.sort((a, b) => a < b)
      );
    },
  },
  actions: {
    getActiveClub({ commit }, clubId) {
      return this.$api.clubs.get(clubId).then((club) => {
        commit("setActiveClub", club.data);
      });
    },
    selectClub({ state }, clubId) {
      const clubInState = state.clubs.find((club) => club._id === clubId);

      if (!clubInState.books) {
        return this.$api.clubs.get(clubId).then((club) => this.commit("setActiveClub", club.data));
      }
      return this.commit("setActiveClub", clubInState);
    },
    createClub(_state, body) {
      return new Promise((resolve) => {
        this.$api.clubs.post(body).then((club) => {
          resolve();
          return this.commit("insertClub", club.data);
        });
      });
    },
  },
};

export default clubStore;
