import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import SignUp from'./App';
import * as serviceWorker from './serviceWorker';
console.log(localStorage.length)

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();

