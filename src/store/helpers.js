export const getDefaultState = () => ({
    focusedBook: {},
    recentBooksArr: [],
    books: [],
    user: {},
    clubs: [],
    activeClub: {},
    invites:[],
    posts: [],
    token: "",
    showRecentBooks: false,
    usersForInvite:[]
  });

export const sortBooks = (state, books) => {
    // Bug where wrong book is displayed in recent books debug splice
    const booksArr = [...books];
    const focusedBook = books.find((book) => book.isCurrent)
    state.books = [...books];
    state.focusedBook = focusedBook ? focusedBook : books[0];
    booksArr.splice(booksArr.indexOf(focusedBook), 1);
    state.recentBooksArr = booksArr;
  };