import storePlugins from "../../plugins/storePlugin";

export const getDefaultState = () => {
  return {
    posts: [],
  };
};

const postStore = {
  namespaced: true,
  plugins: [storePlugins],
  state: getDefaultState(),
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    addComment(state, comment) {
      const post = state.posts.find((post) => post._id === comment.post);

      if (post.comments) {
        post.comments.push(comment);
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
      const post = this.state.clubStore.activeClub.posts.find((post) => post._id === data.postId);
      const commentToDelete = post.comments.find((comment) => comment._id === data.commentId);

      post.comments.splice(post.comments.indexOf(commentToDelete), 1);
    },
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    async getAllPostForClub(_state, clubId) {
      const posts = await this.$api.posts.get(`${clubId}`);
      this.commit("clubStore/setPost", posts.data);
    },
    async getPost(_state, data) {
      const post = await this.$api.posts.get(`${data.clubId}/${data.postId}`);
      this.commit("clubStore/setPost", [post.data]);
    },
    async addPost(_state, data) {
      const posts = await this.$api.posts.post(data);
      this.commit("clubStore/addPost", posts);
      return posts;
    },
    updatePost(_state, data) {
      return new Promise((resolve, reject) => {
        this.$api.posts
          .patch(data.id, data.content)
          .then((post) => {
            resolve("");
            return this.commit("clubStore/updatePost", post.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    deletePost(_state, data) {
      return new Promise((resolve, reject) => {
        this.$api.posts
          .delete(`${data.clubId}/${data.postId}`)
          .then(() => {
            resolve("");
            return this.commit("clubStore/deletePost", data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async addComment({ commit }, data) {
      const comment = await this.$api.comments.post(data.formData);
      commit("addComment", comment);
      return comment;
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
