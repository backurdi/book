import { ModelApiService } from "./modelApiService";
import { handleErrors } from "./servicesHelper";

export default class BooksService extends ModelApiService {
  constructor() {
    super("books");
  }

  static async searchBooks(id) {
    try {
      if (!id) throw Error("Id is not provided");
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${id}`,
      );
      return await response.json();
    } catch (err) {
      handleErrors(err);
      return err;
    }
  }
}
