import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import {
  Navbar,
  Nav,
} from 'react-bootstrap'

import AuthService from './services/auth.services'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Profile from './components/Profile'
import BoardUser from './components/BoardUser'
import BoardModerator from './components/BoardModerator'
import BoardAdmin from './components/BoardAdmin'
import AddArticle from './components/addArticles'
import EditArticle from './components/editArticle'
import EditCom from './components/editCom'
import EditProfil from './components/editProfil'

class App extends Component {
  constructor (props) {
    super(props)
    this.logOut = this.logOut.bind(this)

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      userCo: []
    }
  }

  componentDidMount () {
    const user = AuthService.getCurrentUser()
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes('ROLE_MODERATEUR'),
        showAdminBoard: user.roles.includes('ROLE_ADMIN')
      })
    }
  }

  logOut () {
    
    AuthService.logout()
 
 
  }

  render () {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state

    return (
      <>
        <Navbar bg='light' expand='lg'>
          <Navbar.Brand href='' >
            <Link to={'/articles'} className='navbar-brand'>
              Groupomania
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav '  />
          <Navbar.Collapse id='basic-navbar-nav ' >
            <Nav className='ml-auto '>
            {!currentUser && (
           
                <Link to={'/home'} className='nav-link'>
                  Home
                </Link>
             
            )}

            {showModeratorBoard && (
              
                <Link to={'/mod'} className='nav-link'>
                  Modération des commentaires
                </Link>
             
            )}

            {showAdminBoard && (
             
                <Link to={'/admin'} className='nav-link'>
                  Admin Board
                </Link>
             
            )}

            {currentUser && (
         
        
              <Link to={'/articles'} className='nav-link'>
                Articles
              </Link>
           
            )}
            {currentUser && (
             
                <Link to={'/addArticle'} className='nav-link'>
                  {' '}
                  Ajouter un article{' '}
                </Link>
             
            )}

            {currentUser ? (
              <div className='navbar-nav ml-auto'>
                
                  <Link to={'/profile'} className='nav-link'>
                    Profile
                  </Link>
                
               
                  <Link to={'/home'} className='nav-link' onClick={this.logOut}>
                    LogOut
                  </Link>
               
              </div>
            ) : (
              <div className='navbar-nav ml-auto'>
               
                  <Link to={'/login'} className='nav-link'>
                    Login
                  </Link>
               

               
                  <Link to={'/register'} className='nav-link'>
                    Sign Up
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
            <Route path='/mod' component={BoardModerator} />
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
