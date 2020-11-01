import React, { Component } from "react";


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }



  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Bienvenue sur le réseau social de Groupomania</h3>
          <p>Connectez vous pour voir les posts de vos collegues !</p>
        </header>
      </div>
    );
  }
}