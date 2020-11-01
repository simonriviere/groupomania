import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
  getUser(id){
  return axios.get(API_URL + `auth/${id}`, { headers: authHeader() } )
  }
  getUserBoard() {
    return axios.get(API_URL + 'articles', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }
  update(id, data) {
    return axios.put(API_URL + `auth/${id}`, data, { headers:authHeader()});
  }
  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
  delete(id) {
    return axios.delete(API_URL + `auth/${id}`, { headers:authHeader()});
  }
}

export default new UserService();