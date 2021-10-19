import BooksService from "../services/booksService";
import CommentsService from "../services/commentsService";
import UserService from "../services/userService";
import ContactService from "../services/contactService";
import ClubService from "../services/clubService";
import PostsService from "../services/postsService";
import GifService from "../services/gifService";

const $api = {
  books: new BooksService(),
  comments: new CommentsService(),
  users: new UserService(),
  clubs: new ClubService(),
  posts: new PostsService(),
  contact: new ContactService(),
  gif: new GifService(),
};

export default function (store) {
  try {
    store.$api = $api;
  } catch (e) {
    console.error(e);
  }
}
