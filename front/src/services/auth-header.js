//vérification du stockage du token dans l'en tête http
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.token) {
      // for Node.js Express back-end
      return {
         'authorization': 'token '+ user.token,
  };
         
    } else {
      return {};
    }
  }
  