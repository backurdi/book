import storePlugins from "../../plugins/storePlugin";

const postStore = {
  namespaced: true,
  plugins: [storePlugins],
  state: () => ({
    posts: [],
  }),
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    addComment(state, comment) {
      const post = state.posts.find((post) => post._id === comment.post);

      if (post.comments) {
        post.comments.unshift(comment);
      } else {
        post.comments = [comment];
      }
    },
    updateComment(_state, updatedComment) {
      const post = this.state.clubStore.activeClub.posts.find((post) => post._id === updatedComment.post);
      const commentToUpdate = post.comments.find((comment) => comment._id === updatedComment._id);

      post.comments[post.comments.indexOf(commentToUpdate)] = updatedComment;
    },
    deleteComment(state, data) {
      const post = this.state.clubStore.activeClub.posts.find((post) => (post._id = data.postId));
      const commentToDelete = post.comments.find((comment) => comment._id === data.commentId);

      post.comments.splice(post.comments.indexOf(commentToDelete), 1);
    },
  },
  actions: {
    addPost(_state, data) {
      return this.$api.posts.post(data).then((post) => this.commit("clubStore/addPost", post.data));
    },
    updatePost({ commit }, data) {
      return new Promise((resolve, reject) => {
        this.$api.posts
          .patch(data.id, data.content)
          .then((post) => {
            resolve("");
            return commit("updatePost", post.data);
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
            return this.commit("clubStore/deletePost", data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    addComment({ commit }, data) {
      return new Promise((resolve, reject) => {
        this.$api.comments
          .post(data.formData)
          .then((comment) => {
            resolve("");
            return commit("addComment", comment.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    updateComment({ commit }, data) {
      return new Promise((resolve, reject) => {
        this.$api.comments
          .patch(data.id, data.formData)
          .then((comment) => {
            resolve("");
            return commit("updateComment", comment.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    deleteComment({ commit }, data) {
      return this.$api.comments.delete(data.commentId).then(() => {
        return commit("deleteComment", data);
      });
    },
  },
};

export default postStore;
