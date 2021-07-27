import axios from "axios";

class BaseApiService {
  baseUrl = process.env.VUE_APP_BASE_URL;
  resource;
  token = localStorage.getItem("jwt");

  headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + this.token,
  };

  constructor(resource) {
    if (!resource) throw new Error("Resource is not provided");
    this.resource = resource;
  }

  getUrl(id = "") {
    return `${this.baseUrl}/${this.resource}/${id}`;
  }

  handleErrors(err) {
    // Note: here you may want to add your errors handling
    console.log({ message: "Errors is handled here", err });
  }
}

export class ReadOnlyApiService extends BaseApiService {
  constructor(resource) {
    super(resource);
  }
  async fetch() {
    console.log(this.token);
    try {
      const response = await fetch(this.getUrl(), { headers: this.headers });
      return await response.json();
    } catch (err) {
      this.handleErrors(err);
    }
  }
  async get(id) {
    try {
      if (!id) throw Error("Id is not provided");
      const response = await fetch(this.getUrl(id), {
        headers: this.headers,
      });
      return await response.json();
    } catch (err) {
      this.handleErrors(err);
    }
  }
}

export class ModelApiService extends ReadOnlyApiService {
  constructor(resource) {
    super(resource);
  }
  async post(data = {}) {
    try {
      const response = await axios.post(this.getUrl(), data, {
        headers: this.headers,
      });

      return response.data;
    } catch (err) {
      this.handleErrors(err);
    }
  }
  async put(id, data = {}) {
    if (!id) throw Error("Id is not provided");
    try {
      const response = await fetch(this.getUrl(id), {
        method: "PUT",
        body: JSON.stringify(data),
        headers: this.headers,
      });
      const { id: responseId } = response.json();
      return responseId;
    } catch (err) {
      this.handleErrors(err);
    }
  }
  async delete(id) {
    if (!id) throw Error("Id is not provided");
    try {
      await fetch(this.getUrl(id), {
        method: "DELETE",
      });
      return true;
    } catch (err) {
      this.handleErrors(err);
    }
  }
}
