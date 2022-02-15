export class BaseApiService {
  baseUrl = import.meta.env.VITE_BASE_URL;

  resource;

  constructor(resource) {
    if (!resource) throw new Error("Resource is not provided");
    this.resource = resource;
  }

  getUrl(id = "") {
    if (id.length && id[0] !== "?") {
      return `${this.baseUrl}/${this.resource}/${id}`;
    } else if (id.length && id[0] === "?") {
      return `${this.baseUrl}/${this.resource}${id}`;
    } else {
      return `${this.baseUrl}/${this.resource}`;
    }
  }
}
