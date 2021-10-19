import axios from "axios";
import { ReadOnlyApiService } from "./readOnlyApiService";
import { handleErrors } from "./servicesHelper";

export class ModelApiService extends ReadOnlyApiService {
  async post(data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(this.getUrl(), data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          handleErrors(err);
          reject(err.response.data);
        });
    });
  }

  async patch(id, data = {}) {
    if (!id) throw Error("Id is not provided");
    return new Promise((resolve, reject) => {
      axios
        .patch(this.getUrl(id), data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          handleErrors(err);
          reject(err.response.data);
        });
    });
  }

  async delete(id) {
    console.log(id);
    return new Promise((resolve, reject) => {
      axios
        .delete(this.getUrl(id), {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then(() => {
          resolve();
        })
        .catch((err) => {
          handleErrors(err);
          reject(err.response.data);
        });
    });
  }
}
