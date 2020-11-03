import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import {
  Navbar,
  Nav,
  NavDropdown
} from 'react-bootstrap'
import UserService from './services/user.service'
import logo from './logo/icon-left-font-monochrome-black.svg'
import AuthService from './services/auth.services'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Profile from './components/Profile'
import BoardUser from './components/BoardUser'

import BoardAdmin from './components/BoardAdmin'
import AddArticle from './components/addArticles'
import EditArticle from './components/editArticle'
import EditCom from './components/editCom'
import EditProfil from './components/editProfil'
import ModeCom from './components/modeCom'
import ModeArticles from './components/modeArticles'
class App extends Component {
  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this)
    this.getUser = this.getUser.bind(this)

    this.state = {
      showModeratorBoard: false,
      currentUser: undefined,
      getCurrentUser: AuthService.getCurrentUser(),
      userCo: [],
      test: [],

    }
  }
  componentDidMount() {
    this.getUser()
  }
  getUser(id) {
    const { getCurrentUser } = this.state
    if (getCurrentUser != null) {
      UserService.getUser(getCurrentUser.userId)
        .then(response => {
          this.setState({
            userCo: response.data
          })
          if (response.data) {
            this.setState({
              currentUser: this.state.userCo,
              showModeratorBoard: this.state.userCo.role.includes('MODO'),
            })
          }
        })
        .catch(e => {
          console.log(e)
          localStorage.removeItem("user");
          window.location.reload()
        })
    }
  }

  logOut() {
    AuthService.logout()
  }



  render() {
    const { currentUser, showModeratorBoard } = this.state
    const token = localStorage.getItem('user')

    return (
      <>
        <Navbar bg='lighte' expand='lg'>
          <Navbar.Brand href='' >
            {!currentUser ? (
              <Link to={'/home'} className='navbar-brand'>
                <img src={logo} alt="Logo groupomania" ></img>
              </Link>
            ) : (
                <Link to={'/articles'} className='navbar-brand'>
                  <img src={logo} alt="Logo groupomania" ></img>
                </Link>
              )

            }
          </Navbar.Brand>

          <Navbar.Toggle aria-controls='basic-navbar-nav ' />
          <Navbar.Collapse id='basic-navbar-nav ' >
            <Nav className='ml-auto '>

              {!currentUser && (

                <Link to={'/home'} className='nav-link'>
                  Accueil
                </Link>

              )}

              {showModeratorBoard && token && (
                <NavDropdown title="Modérateur" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/modCom">Commentaires</NavDropdown.Item>
                  <NavDropdown.Item href="/modArticle">Articles</NavDropdown.Item>

                </NavDropdown>

              )}


              {currentUser && token && (


                <Link to={'/articles'} className='nav-link'>
                  Articles
                </Link>

              )}
              {currentUser && token && (

                <Link to={'/addArticle'} className='nav-link'>
                  {' '}
                  Ajouter un article{' '}
                </Link>

              )}

              {currentUser && token ? (
                <div className='navbar-nav ml-auto'>

                  <Link to={'/profile'} className='nav-link'>
                    Profile
                  </Link>


                  <a href='/login' className='nav-link' onClick={this.logOut}>
                    Se déconnecter
                  </a>

                </div>
              ) : (
                  <div className='navbar-nav ml-auto'>

                    <Link to={'/login'} className='nav-link'>
                      Se connecter
                  </Link>

                    <Link to={'/register'} className='nav-link'>
                      S'enregistrer
                  </Link>

                  </div>
                )}

            </Nav>

          </Navbar.Collapse>
        </Navbar>
        <div className='container mt-3'>
          <Switch>
            <Route exact path={['/', '/home']} component={Home} />
            <Route exact path='/login' component={Login} />
            <Route path='/admin' component={BoardAdmin} />
            <Route path='/modCom' component={ModeCom} />
            <Route path='/modArticle' component={ModeArticles} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/articles' component={BoardUser} />
            <Route exact path='/addArticle' component={AddArticle} />
            <Route exact path='/articles/:id' component={EditArticle} />
            <Route exact path='/commentaire/:id' component={EditCom} />
            <Route exact path='/profil/:id' component={EditProfil} />
          </Switch>
        </div>
      </>
    )
  }
}

export default App
