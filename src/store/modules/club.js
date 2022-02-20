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
    setPost(state, posts) {
      const club = state.clubs.find((club) => club._id === posts[0]?.club || club._id === posts.club);
      club.posts = posts;
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
      if (club.books) {
        this.commit("bookStore/setBooks", club.books);
      }
    },
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    async getActiveClub({ commit }, clubId) {
      const club = await this.$api.clubs.get(clubId);
      commit("setActiveClub", club.data);
      this.dispatch("postStore/getPostsForClub", clubId);
      return club;
    },
    async selectClub({ state, commit }, clubId) {
      const clubInState = state.clubs.find((club) => club._id === clubId);

      if (!clubInState?.books?.length) {
        const club = await this.$api.clubs.get(clubId);
        commit("setActiveClub", club.data);
        this.commit("postStore/resetPostPage");
        this.dispatch("postStore/getPostsForClub", clubId);
        return;
      }

      return commit("setActiveClub", clubInState);
    },
    async createClub({ commit, state }, body) {
      const club = await this.$api.clubs.post(body);
      if (!state.clubs.length) {
        commit("insertClub", club);
        commit("setActiveClub", club);
      } else {
        commit("insertClub", club);
      }
      return club;
    },
    async updateClub({ commit }, { id, body }) {
      return this.$api.clubs.patch(id, body).then((club) => {
        commit("setActiveClub", club.data);
      });
    },
  },
};

export default clubStore;
