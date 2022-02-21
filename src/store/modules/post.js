import storePlugins from "../../plugins/storePlugin";

export const getDefaultState = () => {
  return {
    posts: [],
    postPage: 1,
    postPageLimit: 5,
    postsCount: 0,
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
    addPosts(state, posts) {
      state.posts.push(...posts);
    },
    addPost(state, post) {
      state.posts.unshift(post);
    },
    deletePost(state, data) {
      const postToDelete = state.posts.find((post) => post._id === data.postId);

      state.posts.splice(state.posts.indexOf(postToDelete), 1);
    },
    addComment(state, comment) {
      const post = state.posts.find((post) => post._id === comment.post);
      if (post.comments) {
        post.comments.push(comment);
      } else {
        post.comments = [comment];
      }
    },
    updateComment(state, updatedComment) {
      const post = state.posts.find((post) => post._id === updatedComment.post);
      const commentToUpdate = post.comments.find((comment) => comment._id === updatedComment._id);

      post.comments[post.comments.indexOf(commentToUpdate)] = updatedComment;
    },
    deleteComment(state, data) {
      const post = state.posts.find((post) => post._id === data.postId);
      const commentToDelete = post.comments.find((comment) => comment._id === data.commentId);

      post.comments.splice(post.comments.indexOf(commentToDelete), 1);
    },
    incrementPostPage(state) {
      state.postPage++;
    },
    resetPostPage(state) {
      state.postPage = 1;
    },
    incrementPostCount(state) {
      state.postsCount++;
    },
    setPostCount(state, count) {
      state.postsCount = count;
    },
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    async getPostsForClub({ state, commit }, clubId) {
      if (!state.posts.length || state.posts.filter((post) => post.club === clubId).length < state.postsCount) {
        const posts = await this.$api.posts.get(`${clubId}?page=${state.postPage}&limit=${state.postPageLimit}`);
        commit("setPostCount", posts.count);
        if (state.postPage > 1) {
          commit("addPosts", posts.data);
        } else {
          commit("setPosts", posts.data);
        }
        commit("incrementPostPage");
      }
    },
    async getPost(_state, data) {
      const post = await this.$api.posts.get(`${data.clubId}/${data.postId}`);
      this.commit("clubStore/setPost", [post.data]);
    },
    async addPost({ commit }, data) {
      const post = await this.$api.posts.post(data);
      commit("addPost", post);
      return post;
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
    deletePost({ commit }, data) {
      return new Promise((resolve, reject) => {
        this.$api.posts
          .delete(`${data.clubId}/${data.postId}`)
          .then(() => {
            resolve("");
            return commit("deletePost", data);
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
