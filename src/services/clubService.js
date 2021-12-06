import { ModelApiService } from "./modelApiService";
import axios from "axios";
import { handleErrors } from "./servicesHelper";

export default class ClubService extends ModelApiService {
  constructor() {
    super("clubs");
  }

  async answerInvite(data = {}) {
    try {
      const response = await axios.post(`${this.getUrl()}/answerInvite`, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      return response.data;
    } catch (err) {
      return handleErrors(err);
    }
  }

  async inviteUsers(data = {}, clubId) {
    try {
      const response = await axios.post(`${this.getUrl()}/${clubId}/inviteUsers`, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      return response.data;
    } catch (err) {
      return handleErrors(err);
    }
  }
}
