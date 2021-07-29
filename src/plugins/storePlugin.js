import { BooksService } from "../services/books.service";
import { CommentsService } from "../services/comments.service";
import { UserService } from "../services/user.service";
import { ContactService } from "../services/contact.service";

const $api = {
  books: new BooksService(),
  comments: new CommentsService(),
  users: new UserService(),
  contact: new ContactService
};

export default function(store) {
  try {
    store.$api = $api;
  } catch (e) {
    console.error(e);
  }
}
