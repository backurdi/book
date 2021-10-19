import axios from "axios";
import { handleErrors } from "./servicesHelper";

export default class GifService {
    apiKey = 'lRPYnImMv0tZ7vix00l0rcNdvRJylED9'
    searchEndPoint = "https://api.giphy.com/v1/gifs/search?";
    limit = 10;
    
    constructor() {}

    async get({searchTerm, offset}){
        try {
            const response = await axios.get(`${this.searchEndPoint}&api_key=${this.apiKey}&q=${searchTerm}&limit=${this.limit}&offset=${offset}`);
            return response;
          } catch (err) {
            handleErrors(err);
            return err;
          }
    }
}