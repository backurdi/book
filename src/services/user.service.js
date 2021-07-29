import { ModelApiService } from "./api.js";
import axios from "axios";

export class UserService extends ModelApiService {
  constructor() {
    super("users");
  }

  async login(data = {}) {
    try {
      const response = await axios.post(`${this.getUrl()}login`, data);

      return response.data;
    } catch (err) {
      console.log(err);
      this.handleErrors(err);
    }
  }

  async logout() {
    try {
      await axios.get(`${this.getUrl()}logout`, {headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      }});
      return;
    } catch (err) {
      console.log(err);
      this.handleErrors(err);
    }
  }

  async signup(data = {}) {
    try {
      const response = await axios.post(`${this.getUrl()}signup`, data);

      return response.data;
    } catch (err) {
      console.log(err);
      this.handleErrors(err);
    }
  }
}
