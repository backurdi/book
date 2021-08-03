import { createStore } from "vuex";
import storePlugins from "../plugins/storePlugin";
import router from "../router";

const getDefaultState = () => ({
  focusedBook: {},
  recentBooksArr: [],
  booksArr: [],
  user: {},
  token: "",
  showRecentBooks: false,
});

const store = createStore({
  plugins: [storePlugins],
  state: getDefaultState(),
  mutations: {
    login(state, userData) {
      localStorage.setItem("jwt", userData.token);
      state.token = userData.token;
      state.user = userData.data;
      router.push({ path: "/" });
    },
    logout(state) {
      localStorage.removeItem("jwt");
      Object.assign(state, getDefaultState());
      router.push({ path: "login" });
    },
    addBook(state, book) {
      state.booksArr.push(book);
      if (state.focusedBook.title) {
        state.recentBooksArr.unshift(book);
      } else {
        state.focusedBook = book;
      }
    },
    setBooks(state, booksApiRes) {
      sortBooks(state, booksApiRes);
    },
    setBook(state, updatedBookData) {
      state.focusedBook = updatedBookData;
    },
    deleteBook(state) {
      if (state.recentBooksArr.length) {
        state.focusedBook = state.recentBooksArr.shift();
      } else {
        state.focusedBook = {};
        state.booksArr = [];
      }
    },
    deleteComment(state, commentId) {
      const commentToDelete = state.focusedBook.comments.find(
        (comment) => comment._id === commentId
      );
      state.focusedBook.comments.splice(
        state.focusedBook.comments.indexOf(commentToDelete),
        1
      );
    },
    changeFocusedBook(state, bookId) {
      state.recentBooksArr.unshift(state.focusedBook);
      state.focusedBook = state.recentBooksArr.find(
        (book) => book._id === bookId
      );
      state.recentBooksArr.splice(
        state.recentBooksArr.indexOf(state.focusedBook),
        1
      );
    },

    toggleShowRecentBooks(state) {
      state.showRecentBooks = !state.showRecentBooks;
    },
  },
  actions: {
    /* eslint-disable */
    login(state, loginInfo) {
      return this.$api.users
        .login(loginInfo)
        .then((user) => this.commit("login", user))
        .catch((err) => {
          console.log(err);
          return this.commit("logout", err);
        });
    },
    logout() {
      return this.$api.users.logout().then((user) => {
        return this.commit("logout");
      });
    },
    /* eslint-disable */
    signup(state, signupInfo) {
      return this.$api.users
        .signup(signupInfo)
        .then((user) => this.commit("login", user));
    },
    fetchBooks() {
      return new Promise((resolve) => {
        this.$api.books.fetch({}).then((books) => {
          resolve();
          return this.commit("setBooks", books.data);
        });
      });
    },
    /* eslint-disable */
    updateBook({ state }, data) {
      return this.$api.books
        .patch(state.focusedBook._id, data.body)
        .then((updatedBook) => {
          return this.commit("setBook", updatedBook.data.data);
        });
    },
    /* eslint-disable */
    addBook({ state }, body) {
      return this.$api.books.post(body).then((addedBook) => {
        return this.commit("addBook", addedBook.data);
      });
    },
    deleteBook({ state }) {
      return this.$api.books.delete(state.focusedBook._id).then(() => {
        return this.commit("deleteBook");
      });
    },
    /* eslint-disable */
    searchBooks({ state }, data) {
      return new Promise((resolve) => {
        this.$api.books.searchBooks(data).then((data) => {
          resolve(data);
        });
      });
    },
    addComment({ state }, data) {
      return new Promise((resolve, reject) => {
        this.$api.comments
          .post({
            ...data,
            bookId: state.focusedBook._id,
          })
          .then((updatedBook) => {
            resolve("");
            return this.commit("setBook", updatedBook.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    /* eslint-disable */
    deleteComment({ state }, commentId) {
      return this.$api.comments.delete(commentId).then(() => {
        return this.commit("deleteComment", commentId);
      });
    },
    sendEmail({ state }, emailData) {
      return new Promise((resolve) => {
        this.$api.contact.post(emailData).then(() => {
          resolve("");
        });
      });
    },
  },
});

export default store;

const sortBooks = (state, books) => {
  // Bug where wrong book is displayed in recent books debug splice
  const booksArr = [...books];
  const focusedBook = books.find((book) => book.isCurrent)
  state.booksArr = [...books];
  state.focusedBook = focusedBook ? focusedBook : books[0];
  booksArr.splice(booksArr.indexOf(focusedBook), 1);
  state.recentBooksArr = booksArr;
};
