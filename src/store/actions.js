export const actions = {
  login(_state, loginInfo) {
    return this.$api.users
      .login(loginInfo)
      .then((user) => this.commit("login", user))
      .catch((err) => {
        console.log(err);
        return this.commit("logout", err);
      });
  },
  logout() {
    return this.$api.users.logout().then(() => {
      return this.commit("logout");
    });
  },
  signup(_state, signupInfo) {
    return this.$api.users.signup(signupInfo).then((user) => this.commit("login", user));
  },
  getMe() {
    return this.$api.users
      .get("me")
      .then((user) => {
        return this.commit("setCurrentUser", user.data);
      })
      .catch((err) => {
        if (err) {
          return this.commit("logout");
        }
      });
  },
  updateMe(_state, data) {
    return new Promise((resolve) => {
      this.$api.users
        .patch("updateMe", data)
        .then((updatedUser) => {
          resolve("");
          return this.commit("setCurrentUser", updatedUser.data.user);
        })
        .catch((_err) => {
          return _err;
        });
    });
  },
  getStudents() {
    return this.$api.users
      .get("students")
      .then((students) => {
        return this.commit("setStudents", students.data);
      })
      .catch((err) => {
        if (err) {
          return this.commit("logout");
        }
      });
  },
  getUsersForInvite({ state }) {
    return this.$api.clubs.get(`${state.activeClub._id}/usersForInvite`).then((userForInviteList) => {
      return this.commit("setUsersForInvite", userForInviteList.data);
    });
  },
  getActiveClub(_state, clubId) {
    return this.$api.clubs.get(clubId).then((club) => {
      this.commit("setActiveClub", club.data);
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
    this.$api.clubs.post(body).then((club) => this.commit("insertClub", club.data));
  },
  answerInvite(_state, data) {
    this.$api.clubs
      .answerInvite(data)
      .then((res) => this.commit("answerInvite", { accepted: data.accepted, club: res.data }));
  },
  inviteUsers({ state }, invites) {
    this.$api.clubs.inviteUsers(invites, state.activeClub._id);
  },
  fetchBooks() {
    return new Promise((resolve) => {
      this.$api.books.fetch({}).then((books) => {
        resolve();
        return this.commit("setBooks", books.data);
      });
    });
  },
  updateBook({ state }, data) {
    return this.$api.books.patch(state.focusedBook._id, data.body).then((updatedBook) => {
      return this.commit("setBook", updatedBook.data.data);
    });
  },
  addBook({ state }, body) {
    body = { ...body, club: state.activeClub._id };
    return new Promise((resolve, reject) => {
      this.$api.books
        .post(body)
        .then((addedBook) => {
          resolve("");
          return this.commit("addBook", addedBook.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteBook({ state }) {
    return this.$api.books.delete(state.focusedBook._id).then(() => {
      return this.commit("deleteBook");
    });
  },
  searchBooks(_state, data) {
    return new Promise((resolve) => {
      this.$api.books.searchBooks(data).then((data) => {
        resolve(data);
      });
    });
  },
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
  sendEmail(_state, emailData) {
    return new Promise((resolve) => {
      this.$api.contact.post(emailData).then(() => {
        resolve("");
      });
    });
  },
  getGifs(_state, data) {
    return new Promise((resolve) => {
      this.$api.gif.get(data).then((res) => {
        resolve(res);
      });
    });
  },
};
