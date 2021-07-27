import { createStore } from "vuex";
import storePlugins from "../plugins/storePlugin";
import router from "../router";

const store = createStore({
  plugins: [storePlugins],
  state: {
    name: "Vue",
    focusedBook: {},
    recentBooksArr: [],
    booksArr: [],
    user: {},
  },
  mutations: {
    login(state, userData) {
      localStorage.setItem("jwt", userData.token);
      state.user = userData.data;
      console.log(state.user);
      router.push({ path: "/" });
    },
    logout(state) {
      localStorage.removeItem("jwt");
      state.user = {};
      router.push({ path: "login" });
    },
    addBook(state, book) {
      state.booksArr.push(book);
      sortBooks(state, state.booksArr);
    },
    setBooks(state, booksApiRes) {
      sortBooks(state, booksApiRes);
    },
    setBook(state, updatedBookData) {
      state.focusedBook = updatedBookData;
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
      const booksArr = [...state.booksArr];
      state.focusedBook = booksArr.find((book) => book._id === bookId);
      booksArr.splice(booksArr.indexOf(state.focusedBook), 1);
      state.recentBooksArr = booksArr;
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
        })
    },
    logout() {
      return this.$api.users
        .logout()
        .then((user) => {
          return this.commit("logout");
        });
    },
    /* eslint-disable */
    signup(state, signupInfo){
      return this.$api.users.signup(signupInfo)
      .then(user => this.commit('login', user))
    },
    async fetchBooks() {
      const books = await this.$api.books.fetch({});
      return this.commit("setBooks", books.data);
    },
    /* eslint-disable */
    addBook({ state }, body) {
      return this.$api.books.post(body).then((addedBook) => {
        console.log(addedBook);
        return this.commit("addBook", addedBook.data);
      });
    },
    addComment({ state }, data) {
      return this.$api.comments
        .post({
          ...data,
          bookId: state.focusedBook._id,
        })
        .then((updatedBook) => {
          return this.commit("setBook", updatedBook.data);
        });
    },
    /* eslint-disable */
    deleteComment({ state }, commentId) {
      return this.$api.comments.delete(commentId).then(() => {
        return this.commit("deleteComment", commentId);
      });
    },
  },
});

const sortBooks = (state, books) => {
  const booksArr = [...books];
  state.booksArr = [...books];
  state.focusedBook = books.find((book) => book.isCurrent);
  booksArr.splice(booksArr.indexOf(state.focusedBook) + 1, 1);
  state.recentBooksArr = booksArr;
};

export default store;
