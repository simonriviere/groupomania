import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
  getUser(id, data){
  return axios.get(API_URL + `/profile/${id}`, data, { headers: authHeader() })
  }
  getUserBoard() {
    return axios.get(API_URL + 'articles', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();