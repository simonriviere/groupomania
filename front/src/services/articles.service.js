import authHeader from './auth-header';
import axios from "axios";

const API_URL = "http://localhost:3000/api";

    //"Content-type": "multipart/form-data ; boundary=something",
 

class ArticleDataService {
  getAll() {
    return axios.get(API_URL + "/articles");
  }

  get(id) {
    return axios.get(API_URL + `/articles/${id}`);
  }

  create(data) {
    return axios.post(API_URL +"/articles", data, { headers:authHeader()});
      }

  update(id, data) {
    return axios.put(API_URL + `/articles/${id}`, data);
  }

  delete(id) {
    return axios.delete(API_URL + `/articles/${id}`);
  }

  /* deleteAll() {
    return axios.delete(`/articles`);
  } */

/*   findByTitle(title) {
    return axios.get(`/articles?title=${title}`);
  } */
}

export default new ArticleDataService();