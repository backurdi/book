import router from "../router";
import {sortBooks} from './helpers';
import {getDefaultState} from './helpers';

export const mutations = {
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
    setCurrentUser(state, user){
      state.user = {id:user._id, name:user.name, email:user.email, photo:user.photo};
      state.clubs = user.clubs;
      if(user.clubs.length){
        this.dispatch('getActiveClub', user.clubs[0]._id);
      }
    },
    setActiveClub(state, club){
      state.activeClub = club;
      const clubArrInstance = state.clubs.find(clubInstance => clubInstance._id === club._id);
      
      if(!clubArrInstance.books){
        state.clubs[state.clubs.indexOf(clubArrInstance)] = club;
      }

      this.commit('setBooks', club.books);
      state.posts = club.posts;
    },
    addBook(state, book) {
      state.booksArr.push(book);
      if (state.focusedBook?.title) {
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
    addPost(state, post){
      const club = state.clubs.find(club=>club._id === post.club);

      club.posts.unshift(post);
    },
    updatePost(state, updatedPost){
      const club = state.clubs.find(club=>club._id === updatedPost.club);
      const postToUpdate = club.posts.find(post=>post._id === updatedPost._id);

      club.posts[club.posts.indexOf(postToUpdate)] = updatedPost;
    },
    deletePost(state, data){
      const club = state.clubs.find(club=>club._id === data.clubId);
      const postToDelete = club.posts.find(post=>post._id === data.postId);
  
      club.posts.splice(club.posts.indexOf(postToDelete), 1);
      
    },
    addComment(state, comment){
      const post = state.posts.find(post=>post._id === comment.post);
      
      if(post.comments){
        post.comments.unshift(comment);
      }else{
        post.comments = [comment];
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
  }