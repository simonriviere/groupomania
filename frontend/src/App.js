import React, {Component} from 'react'
import { BrowserRouter, Route, Link } from "react-router-dom";
import {Signup} from'./components/signup';
import {Login} from './components/login'; 
import{Article} from './components/articles'
import './App.css';

class App extends Component {

  render()  {
    return  (
      <BrowserRouter>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {localStorage.length === 1 && <> <li>  <Link to="/articles">Article</Link></li> </>}
        </ul>
          <hr />
          <div className="main-route-place">
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/articles" component={Article} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
 
}
class Home extends Component {
 
  render()  {
    return (
      <div>
        <h2>Home</h2>
        <ul>
          <li> <Link to="/signup">S'enregistrer</Link> </li>
          <li> <Link to="/login">Connection</Link></li>
        </ul>
      
       
      </div>
    );
  }
}


export default App;