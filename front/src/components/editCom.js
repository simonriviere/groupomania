import React, { Component } from 'react'
import CommentaireDataService from '../services/commentaire.service'
import { Link } from 'react-router-dom'
import AuthService from '../services/auth.services'
import UserService from '../services/user.service'

export default class EditArticle extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentComs: {
        id: null,
        message: '',
        userId: '',
        articleId :''
      },
      modo : false,
      currentUser: AuthService.getCurrentUser(),
      userCo:[]
    }

    this.onChangeMessage = this.onChangeMessage.bind(this)
    this.getCom = this.getCom.bind(this)
    this.updateCom = this.updateCom.bind(this)
    this.deleteCom = this.deleteCom.bind(this)
    this.getUser = this.getUser.bind(this)
  }

  componentDidMount () {
    this.getCom(this.props.match.params.id)
    this.getUser(this.state.currentComs.userId)

  }

  onChangeMessage (e) {
    const message = e.target.value

    this.setState(function (prevState) {
      return {
        currentComs: {
          ...prevState.currentComs,
          message: message
        }
      }
    })
  }

  getCom (id) {
    CommentaireDataService.get(id)
      .then(response => {
        this.setState({
          currentComs: response.data
        })
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  updateCom () {
    CommentaireDataService.update(
      this.state.currentComs.id,
      this.state.currentComs
    )
      .then(response => {
        console.log(response.data)
        this.setState({
          message: 'The Com was updated successfully!'
        })
      })
      .catch(e => {
        console.log(e)
      })
  }

  deleteCom () {
    const sup = window.confirm('Voulez-vous supprimer votre article?')
    if(sup === true){
    CommentaireDataService.delete(this.state.currentComs.id)
      .then(response => {
          this.props.history.push('/articles')
      })
      .catch(e => {
        console.log(e)
      })
  }
}
  
getUser(id) {
  UserService.getUser(this.state.currentUser.userId)
  .then(response => {
    this.setState({
      userCo: response.data
    })
    console.log(response.data)
    if (response.data) {
      this.setState({
        modo : this.state.userCo.role.includes('MODO')
      })
    }
    })
    .catch(e => {
      console.log(e)
    })
  }


  render () {
    const { currentComs, currentUser, modo } = this.state

    return (
      <div className='container submit-form '>
      {((currentComs.userId === currentUser.userId)||modo) &&
        <div>


          <div className='form-group '>
            <label htmlFor='message'>Message</label>
            <input
              type='text'
              className='form-control col-6 '
              id='message'
              required
              value={currentComs.message}
              onChange={this.onChangeMessage}
              name='message'
            />
          </div>

          <div className='container text-center'>
            <div className='row '>
             <div className="col-12 text-center">
                  <Link
                onClick={this.updateCom}
                to={'/articles'}
                className=' col-3 mt-4 btn btn-success'
              >
                Modifier
              </Link>
              
              <Link
              to={'/articles'}
                    className='col-3 mt-4 ml-4 btn btn-danger'
                onClick={this.deleteCom}
              >
                Supprimer
            
              </Link>
          
             </div>
             
            </div>
          </div>
        </div>
  }
      </div>
    )
  }
}
