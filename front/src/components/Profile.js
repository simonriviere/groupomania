//Affiche le profil en fonction du jeton
import React, { Component } from 'react'
import AuthService from '../services/auth.services'
import UserService from '../services/user.service'
import { Link } from 'react-router-dom'

export default class Profile extends Component {
  constructor (props) {
    super(props)
    this.getUser = this.getUser.bind(this)
    this.deleteProfile = this.deleteProfile.bind(this)

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      userCo: []
    }
  }
  componentDidMount () {
    this.getUser(this.props.match.params.id)
  }

  getUser (id) {
   
    const { currentUser } = this.state
     if(currentUser != null){
       UserService.getUser(currentUser.userId)
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

  }
  deleteProfile () {
    console.log(this.state.currentUser)
    const sup = window.confirm('Voulez-vous supprimer votre profil?')
    if (sup === true) {
      UserService.delete(this.state.currentUser.userId)
        .then(response => {
          AuthService.logout()
          this.props.history.push('/login')
          window.location.reload()
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
  render () {
    const {  userCo } = this.state
    return (
      <div>
        <div className='container'>
          {userCo &&
            [userCo].map(userCo => (
              <>
                <img
                  src={`${userCo.imageProfil}`}
                  className='card-text'
                  width='200'
                  height='200'
                  alt="utilisateur "
                ></img>
                <p>
                  <strong>Pseudo : </strong> {userCo.pseudo}
                </p>

                <p>
                  <strong>Nom : </strong> {userCo.nom}
                </p>
                <p>
                  <strong>Prénom : </strong> {userCo.prenom}
                </p>

                <p>
                  <strong>Email:</strong> {userCo.email}
                </p>
  
                <Link
                  to={'/profil/' + userCo.id}
                  className='mt-1 col-sm-12 col-md-3  btn btn-success '
                >
                  Modifier
                </Link>
                <button
                  className='mt-1 col-sm-12 col-md-3 offset-md-2 btn btn-danger'
                  onClick={this.deleteProfile}
                >
                  Supprimer
                </button>
              </>
            ))}
        </div>
      </div>
    )
  }
}
