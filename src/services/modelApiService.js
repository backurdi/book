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

  async put(id, data = {}) {
    if (!id) throw Error("Id is not provided");
    try {
      const response = await axios.put(this.getUrl(id), data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      return response;
    } catch (err) {
      handleErrors(err);
      return err;
    }
  }

  async delete(id) {
    if (!id) throw Error("Id is not provided");
    try {
      await axios.delete(this.getUrl(id), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      return true;
    } catch (err) {
      handleErrors(err);
      return err;
    }
  }
}
