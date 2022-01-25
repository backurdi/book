import storePlugins from "../../plugins/storePlugin";

export const getDefaultState = () => {
  return {
    clubs: [],
    activeClub: {},
  };
};

const clubStore = {
  namespaced: true,
  plugins: [storePlugins],
  state: getDefaultState(),
  mutations: {
    addPost(state, post) {
      const club = state.clubs.find((club) => club._id === post.club);

      club.posts.unshift(post);
    },
    updatePost(state, updatedPost) {
      const club = state.clubs.find((club) => club._id === updatedPost.club);
      const postToUpdate = club.posts.find((post) => post._id === updatedPost._id);

      club.posts[club.posts.indexOf(postToUpdate)] = updatedPost;
    },
    deletePost(state, data) {
      const club = state.clubs.find((club) => club._id === data.clubId);
      const postToDelete = club.posts.find((post) => post._id === data.postId);

      club.posts.splice(club.posts.indexOf(postToDelete), 1);
    },
    insertClub(state, club) {
      debugger;
      state.clubs = [...state.clubs, club];
    },
    setClubs(state, clubs) {
      state.clubs = clubs;
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
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    getActiveClub({ commit }, clubId) {
      return this.$api.clubs.get(clubId).then((club) => {
        commit("setActiveClub", club.data);
      });
    },
    selectClub({ state, commit }, clubId) {
      const clubInState = state.clubs.find((club) => club._id === clubId);

      if (!clubInState.books) {
        return this.$api.clubs.get(clubId).then((club) => commit("setActiveClub", club.data));
      }
      return commit("setActiveClub", clubInState);
    },
    createClub({ commit }, body) {
      return new Promise((resolve) => {
        this.$api.clubs.post(body).then((club) => {
          resolve();
          return commit("insertClub", club.data);
        });
      });
    },
  },
};

export default clubStore;
