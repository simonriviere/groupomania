//Affiche le profil en fonction du jeton
import React, { Component } from "react";
import AuthService from "../services/auth.services";
import UserService from "../services/user.service"
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.getUser = this.getUser.bind(this)

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      userCo : [],
    };
  }
  getUser(id) {
    UserService.get(id)
      .then(response => {
        this.setState({
          userCo: response.data
        })
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }
  
  render() {
    const { currentUser } = this.state;
    const { userCo } = this.state
    console.log(userCo)
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
          {userCo}
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