import authHeader from './auth-header';
import axios from "axios";

const API_URL = "http://localhost:3000/api";

    //"Content-type": "multipart/form-data ; boundary=something",
 

class CommentaireDataService {
  getAll() {
    return axios.get(API_URL+ `/com/`, { headers:authHeader()});
  }

  get(id) {
    return axios.get(API_URL + `/com/${id}`, { headers:authHeader()});
  }

  create(data) {
    return axios.post(API_URL +`/com`, data, { headers:authHeader()});
      }

  update(id, data) {
    return axios.put(API_URL + `/com/${id}`, data, { headers:authHeader()});
  }

  delete(id) {
    return axios.delete(API_URL + `/com/${id}`, { headers:authHeader()});
  }

}

export default new CommentaireDataService();