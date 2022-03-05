import axios from "axios";
import { ModelApiService } from "./modelApiService";
import { handleErrors } from "./servicesHelper";

export default class UserService extends ModelApiService {
  constructor() {
    super("users");
  }

  async login(data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.getUrl()}/login`, data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            withCredentials: true,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          handleErrors(err);
          reject(err.response.data.message);
        });
    });
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
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.getUrl()}/signup`, data)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          handleErrors(err);
          reject(err.response.data.message);
        });
    });
  }
}
