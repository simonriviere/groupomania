//Affiche le profil en fonction du jeton
import React, { Component } from "react";
import AuthService from "../services/auth.services";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
        currentUser: AuthService.getCurrentUser(),
        profilUser : AuthService.getProfilUser()
    };
  
  }

  render() {
    const { currentUser } = this.state;
    const {profilUser} = this.state; 
    console.log(currentUser)
    console.log(JSON.stringify(profilUser))
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.pseudo}</strong>
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.token.substring(0, 20)} ...{" "}
          {currentUser.token.substr(currentUser.token.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.userId}
        </p>
        <p>
          <strong>Nom : </strong>{" "}
          {currentUser.nom}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>
    );
  }
}