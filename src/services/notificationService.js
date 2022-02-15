import { ModelApiService } from "./modelApiService";
import io from "socket.io-client";
import axios from "axios";
import { handleErrors } from "./servicesHelper";
// import { handleErrors } from "./servicesHelper";

export default class NotificationService extends ModelApiService {
  constructor() {
    super("notification");
  }

  async initiateSocket() {
    const socket = new io(import.meta.env.VITE_SOCKET_URL, {
      reconnect: true,
    });

    return socket;
  }
  async newNotification() {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.getUrl()}/newNotification`,
          {},
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              withCredentials: true,
            },
          }
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          handleErrors(err);
          reject(err.response?.data);
        });
    });
  }
}
