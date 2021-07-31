import { BaseApiService } from "./baseApiService";
import { handleErrors } from "./servicesHelper";

export class ReadOnlyApiService extends BaseApiService {
  async fetch() {
    try {
      const response = await fetch(this.getUrl(), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      return await response.json();
    } catch (err) {
      handleErrors(err);
      return err;
    }
  }

  async get(id) {
    try {
      if (!id) throw Error("Id is not provided");
      const response = await fetch(this.getUrl(id), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      return await response.json();
    } catch (err) {
      handleErrors(err);
      return err;
    }
  }
}
