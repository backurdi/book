import storePlugins from "../../plugins/storePlugin";
import { sortBooks } from "../helpers";

export const getDefaultState = () => {
  return {
    focusedBook: {},
    books: [],
    showRecentBooks: false,
  };
};

const bookStore = {
  namespaced: true,
  plugins: [storePlugins],
  state: getDefaultState(),
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
    resetState(state) {
      Object.assign(state, getDefaultState());
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
    async addBook({ commit }, body) {
      body = { ...body, club: this.state.clubStore.activeClub._id };
      const addedBook = await this.$api.books.post(body);
      commit("addBook", addedBook);
      return addedBook;
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
