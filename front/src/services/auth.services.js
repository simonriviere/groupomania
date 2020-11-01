import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

class AuthService {
  //Post l'utilisateur et enregistre le token
  login(pseudo, password) {
    return axios
      .post(API_URL + "signin", {
        pseudo,
        password
      })
      .then(response => {
       
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }
    //efface le localStorage pour déconnecter l'utilisateur
  logout() {
    localStorage.removeItem("user");
  }
  
   //enregister un nouveau utilisateur
  register(pseudo, email, password) {
    return axios.post(API_URL + "signup", {
      pseudo,
      email,
      password
    });
  }
  //info de l'utilisateur stocké dans le localStorage
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

}

export default new AuthService();