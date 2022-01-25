import { ModelApiService } from "./modelApiService";
import { handleErrors } from "./servicesHelper";
import axios from "axios";

export default class BooksService extends ModelApiService {
  constructor() {
    super("books");
  }

  async searchBooks(id) {
    try {
      if (!id) throw Error("Id is not provided");
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${id}&maxResults=20
        `
      );
      const filteredData = response.data.items.filter((book) => book);
      return filteredData;
    } catch (err) {
      handleErrors(err);
      return err;
    }
  }
}
