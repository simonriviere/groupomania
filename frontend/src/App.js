import React from 'react';
import {Clock} from'./Clock';
import {Signup} from'./connection';
import {Login} from './connection';
//import{Formulaire} from './form';

import './App.css';

 function App() {
  return (<div>

    <div className="App ">
    <Clock/>
    nav
    </div>
    <div className="SignUp">
      <h2>S'enregistrer</h2>
      <Signup/>
    </div>
    <h2>Se connecter</h2>
    <div className="Login">
      <Login/>
    </div>

    <div className="article"></div>
  </div>

  );
}


export default App; 

