export const getDefaultState = () => ({
  focusedBook: {},
  books: [],
  user: {},
  clubs: [],
  activeClub: {},
  invites: [],
  posts: [],
  token: "",
  showRecentBooks: false,
  usersForInvite: [],
  students: [],
});

export const sortBooks = (state, books) => {
  if (books.length) {
    books = books.sort((a, b) => {
      return a.createdAt > b.createdAt ? -1 : 1;
    });
  }

  // Bug where wrong book is displayed in recent books debug splice
  const focusedBook = books.find((book) => book.isCurrent);
  state.books = [...books];
  state.focusedBook = focusedBook ? focusedBook : books[0];
};
