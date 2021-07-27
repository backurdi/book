import { ModelApiService } from "./api.js";

export class BooksService extends ModelApiService {
  constructor() {
    super("books");
  }

  async searchBooks(id) {
    try {
      if (!id) throw Error("Id is not provided");
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${id}`
      );
      return await response.json();
    } catch (err) {
      this.handleErrors(err);
    }
  }
}
