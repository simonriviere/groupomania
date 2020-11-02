import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/';

class UserService {

  getPublicContent() {
    return axios.get(API_URL );
  }
  getUserBoard() {
    return axios.get(API_URL + 'articles', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }
  update(id, data) {
    return axios.put(API_URL + `auth/${id}`, data, { headers: authHeader() });
  }
  getUser(id) {
    return axios.get(API_URL + `auth/${id}`, { headers: authHeader() })
  }
  getAllUser(){
    return axios.get(API_URL + `auth`)
  }
  delete(id) {
    return axios.delete(API_URL + `auth/${id}`, { headers: authHeader() });
  }
}

export default new UserService();