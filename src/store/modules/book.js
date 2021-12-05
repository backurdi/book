import storePlugins from "../../plugins/storePlugin";
import { sortBooks } from "../helpers";

const bookStore = {
  namespaced: true,
  plugins: [storePlugins],
  state: () => ({
    focusedBook: {},
    books: [],
    showRecentBooks: false,
  }),
  mutations: {
    addBook(state, book) {
      state.books.unshift(book);
    },
    setBooks(state, booksApiRes) {
      sortBooks(state, booksApiRes);
    },
    setBook(state, updatedBookData) {
      state.focusedBook = updatedBookData;
    },
    setFocusedBook(state, book) {
      state.focusedBook = book;
    },
    deleteBook(state) {
      if (state.books.length) {
        state.focusedBook = state.books.shift();
      } else {
        state.focusedBook = {};
      }
    },
  },
  actions: {
    fetchBooks(commit) {
      return new Promise((resolve) => {
        this.$api.books.fetch({}).then((books) => {
          resolve();
          return commit("setBooks", books.data);
        });
      });
    },
    updateBook({ state, commit }, data) {
      return this.$api.books.patch(state.focusedBook._id, data.body).then((updatedBook) => {
        return commit("setBook", updatedBook.data.data);
      });
    },
    addBook({ commit }, body) {
      body = { ...body, club: this.state.clubStore.activeClub._id };
      return new Promise((resolve, reject) => {
        this.$api.books
          .post(body)
          .then((addedBook) => {
            resolve("");
            return commit("addBook", addedBook.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    deleteBook({ commit, state }) {
      return this.$api.books.delete(state.focusedBook._id).then(() => {
        return commit("deleteBook");
      });
    },
    searchBooks(_state, data) {
      return new Promise((resolve) => {
        this.$api.books.searchBooks(data).then((data) => {
          resolve(data);
        });
      });
    },
  },
};

export default bookStore;
