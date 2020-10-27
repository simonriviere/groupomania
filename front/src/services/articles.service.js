import http from "../http-common";
import authHeader from './auth-header';

class ArticleDataService {
  getAll() {
    return http.get("/articles");
  }

  get(id) {
    return http.get(`/articles/${id}`);
  }

  create(data) {
    return http.post("/articles", data, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/articles/${id}`, data);
  }

  delete(id) {
    return http.delete(`/articles/${id}`);
  }

  /* deleteAll() {
    return http.delete(`/articles`);
  } */

/*   findByTitle(title) {
    return http.get(`/articles?title=${title}`);
  } */
}

export default new ArticleDataService();