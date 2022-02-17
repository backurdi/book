import { BaseApiService } from "./baseApiService";
import { handleErrors } from "./servicesHelper";
import axios from "axios";

export class ReadOnlyApiService extends BaseApiService {
  async fetch() {
    try {
      const response = await fetch(this.getUrl(), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        withCredentials: true,
      });
      return await response.json();
    } catch (err) {
      handleErrors(err);
      return err;
    }
  }

  async get(id) {
    const response = await axios.get(this.getUrl(id), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      withCredentials: true,
    });
    return response.data;
  }
}
