export class BaseApiService {
  baseUrl = process.env.VUE_APP_BASE_URL;

  resource;

  constructor(resource) {
    if (!resource) throw new Error("Resource is not provided");
    this.resource = resource;
  }

  getUrl(id = "") {
    if(id.length){
      return `${this.baseUrl}/${this.resource}/${id}`;
    }else{
      return `${this.baseUrl}/${this.resource}`;
    }
  }
}
