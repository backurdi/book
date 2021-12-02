export const mutations = {
  // login(state, userData) {
  //   localStorage.setItem("jwt", userData.token);
  //   state.token = userData.token;
  //   state.user = userData.data;
  //   router.push({ path: "/" });
  // },
  // logout(state) {
  //   localStorage.removeItem("jwt");
  //   Object.assign(state, getDefaultState());
  //   router.push({ path: "login" });
  // },
  // setCurrentUser(state, user) {
  //   state.user = { id: user._id, name: user.name, email: user.email, photo: user.photo, role: user.role };
  //   state.invites = user.invites;
  //   state.clubs = user.clubs;
  //   if (user.clubs.length) {
  //     const currentClubId = router.currentRoute._value.params.clubId
  //       ? router.currentRoute._value.params.clubId
  //       : user.clubs[0]._id;
  //     this.dispatch("getActiveClub", currentClubId);
  //   }
  // },
  // setUsersForInvite(state, usersForInvite) {
  //   state.usersForInvite = usersForInvite;
  // },
  // setStudents(state, students) {
  //   state.students = students;
  // },
  // insertClub(state, club) {
  //   state.clubs.push(club);
  // },
  // setActiveClub(state, club) {
  //   debugger;
  //   state.activeClub = club;
  //   const clubArrInstance = state.clubs.find((clubInstance) => clubInstance._id === club._id);

  //   if (!clubArrInstance.books) {
  //     state.clubs[state.clubs.indexOf(clubArrInstance)] = club;
  //   }

  //   this.commit("setBooks", club.books);
  //   state.posts = club.posts.sort((a, b) => a < b);
  // },
  answerInvite(state, response) {
    console.log(response);
    if (response.answer) {
      state.invites.splice(state.invites.indexOf(response.club._id), 1);
      state.clubs.push(response.club);
    } else {
      state.invites.splice(state.invites.indexOf(response.club), 1);
    }
  },
  // addBook(state, book) {
  //   state.books.unshift(book);
  // },
  // setBooks(state, booksApiRes) {
  //   sortBooks(state, booksApiRes);
  // },
  // setBook(state, updatedBookData) {
  //   state.focusedBook = updatedBookData;
  // },
  // setFocusedBook(state, book) {
  //   debugger;
  //   state.focusedBook = book;
  // },
  // deleteBook(state) {
  //   if (state.books.length) {
  //     state.focusedBook = state.books.shift();
  //   } else {
  //     state.focusedBook = {};
  //   }
  // },
  // addPost(state, post) {
  //   const club = state.clubs.find((club) => club._id === post.club);

  //   club.posts.unshift(post);
  // },
  // updatePost(state, updatedPost) {
  //   const club = state.clubs.find((club) => club._id === updatedPost.club);
  //   const postToUpdate = club.posts.find((post) => post._id === updatedPost._id);

  //   club.posts[club.posts.indexOf(postToUpdate)] = updatedPost;
  // },
  // deletePost(state, data) {
  //   const club = state.clubs.find((club) => club._id === data.clubId);
  //   const postToDelete = club.posts.find((post) => post._id === data.postId);

  //   club.posts.splice(club.posts.indexOf(postToDelete), 1);
  // },
  // addComment(state, comment) {
  //   const post = state.posts.find((post) => post._id === comment.post);

  //   if (post.comments) {
  //     post.comments.unshift(comment);
  //   } else {
  //     post.comments = [comment];
  //   }
  // },
  // updateComment(state, updatedComment) {
  //   const post = state.activeClub.posts.find((post) => post._id === updatedComment.post);
  //   const commentToUpdate = post.comments.find((comment) => comment._id === updatedComment._id);

  //   post.comments[post.comments.indexOf(commentToUpdate)] = updatedComment;
  // },
  // deleteComment(state, data) {
  //   const post = state.activeClub.posts.find((post) => (post._id = data.postId));
  //   const commentToDelete = post.comments.find((comment) => comment._id === data.commentId);

  //   post.comments.splice(post.comments.indexOf(commentToDelete), 1);
  // },
  changeFocusedBook(state, bookId) {
    state.recentBooksArr.unshift(state.focusedBook);
    state.focusedBook = state.recentBooksArr.find((book) => book._id === bookId);
    state.recentBooksArr.splice(state.recentBooksArr.indexOf(state.focusedBook), 1);
  },

  toggleShowRecentBooks(state) {
    state.showRecentBooks = !state.showRecentBooks;
  },
};
