import axios from "axios";
import { ModelApiService } from "./modelApiService";
import { handleErrors } from "./servicesHelper";

export default class UserService extends ModelApiService {
  constructor() {
    super("users");
  }

  async login(data = {}) {
    try {
      const response = await axios.post(`${this.getUrl()}/login`, data);

      return response.data;
    } catch (err) {
      console.log(err);
      return handleErrors(err);
    }
  }

  async logout() {
    try {
      await axios.get(`${this.getUrl()}/logout`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      return;
    } catch (err) {
      handleErrors(err);
    }
  }

  async signup(data = {}) {
    try {
      const response = await axios.post(`${this.getUrl()}/signup`, data);

      return response.data;
    } catch (err) {
      handleErrors(err);
      return err;
    }
  }
}
