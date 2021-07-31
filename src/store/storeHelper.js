export const sortBooks = (state, books) => {
  const booksArr = [...books];
  state.booksArr = [...books];
  state.focusedBook = books.find((book) => book.isCurrent)
    ? books.find((book) => book.isCurrent)
    : books[0];
  booksArr.splice(booksArr.indexOf(state.focusedBook) + 1, 1);
  state.recentBooksArr = booksArr;
};
