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

export const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};
