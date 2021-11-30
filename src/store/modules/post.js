import storePlugins from "../../plugins/storePlugin";

const postStore = {
  namespaced: true,
  plugins: [storePlugins],
  state: () => ({
    posts: [],
  }),
  mutations: {
    setPosts(state, posts) {
      state.posts.push(...posts);
    },
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
  },
  actions: {
    addPost({ state }, data) {
      data.append("club", state.activeClub._id);
      return this.$api.posts.post(data).then((post) => this.commit("addPost", post.data));
    },
    updatePost(_state, data) {
      return new Promise((resolve, reject) => {
        this.$api.posts
          .patch(data.id, data.content)
          .then((post) => {
            resolve("");
            return this.commit("updatePost", post.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    deletePost(_state, data) {
      return new Promise((resolve, reject) => {
        this.$api.posts
          .delete(data.postId)
          .then(() => {
            resolve("");
            return this.commit("deletePost", data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    addComment(_state, data) {
      return new Promise((resolve, reject) => {
        this.$api.comments
          .post(data.formData)
          .then((comment) => {
            resolve("");
            return this.commit("addComment", comment.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    updateComment(_state, data) {
      console.log(data);
      return new Promise((resolve, reject) => {
        this.$api.comments
          .patch(data.id, data.formData)
          .then((comment) => {
            resolve("");
            return this.commit("updateComment", comment.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    deleteComment(_state, data) {
      return this.$api.comments.delete(data.commentId).then(() => {
        return this.commit("deleteComment", data);
      });
    },
  },
};

export default postStore;
