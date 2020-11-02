import React, { Component } from 'react'
import ArticleDataService from '../services/articles.service'
import { put } from 'axios'
import AuthService from '../services/auth.services'
import UserService from '../services/user.service'

export default class EditArticle extends Component {
  constructor (props) {
    super(props)
    this.fileInput = React.createRef()

    this.state = {
      currentArticles: {
        id: null,
        titre: '',
        message: '',
        image: null,
        userId: '',
        modo : false,
        
        submitted: false
      },
      currentUser: AuthService.getCurrentUser(),
      userCo:[]
    }

    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeMessage = this.onChangeMessage.bind(this)
    this.onChange = this.onChange.bind(this)
    this.getArticle = this.getArticle.bind(this)
    this.updateArticle = this.updateArticle.bind(this)
    this.deleteArticle = this.deleteArticle.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.getUser = this.getUser.bind(this)

  }

  componentDidMount () {
    this.getArticle(this.props.match.params.id)
    this.getUser(this.state.currentArticles.userId)
  }
  onChangeTitle (e) {
    const titre = e.target.value

    this.setState(function (prevState) {
      return {
        currentArticles: {
          ...prevState.currentArticles,
          titre: titre
        }
      }
    })
  }
  onChangeMessage (e) {
    const message = e.target.value

    this.setState(function (prevState) {
      return {
        currentArticles: {
          ...prevState.currentArticles,
          message: message
        }
      }
    })
  }
  onFormSubmit (e) {
    e.preventDefault() // Stop form submit
    this.updateArticle(this.state.file).then(response => {
      console.log(response.data)
      window.location.href = '/articles/'
    })
  }
  onChange (e) {
    this.setState({
      file: e.target.files[0].name
    })
  }
  getArticle (id) {
    ArticleDataService.get(id)
      .then(response => {
        this.setState({
          currentArticles: response.data
        })
      })
      .catch(e => {
        console.log(e)
      })
  }

  updateArticle () {
    const url = `http://localhost:3000/api/articles/${this.state.currentArticles.id}`
    const user = JSON.parse(localStorage.getItem('user'))
    this.setState({ submitted: true })
    const formData = new FormData()
    formData.append('titre', this.state.currentArticles.titre)
    formData.append('message', this.state.currentArticles.message)
    formData.append('userId', user.userId)
    formData.append('image', this.fileInput.current.files[0])
    const config = {
      headers: {
        authorization: 'token ' + user.token,
        'content-type': 'multipart/form-data'
      }
    }
    return put(url, formData, config)
  }
  
  deleteArticle () {
    const sup = window.confirm('Voulez-vous supprimer votre article?')
    
    if (sup === true) {
      ArticleDataService.delete(this.state.currentArticles.id)
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
    const {modo, currentArticles, currentUser } = this.state

    return (
      <>
      {((currentArticles.userId === currentUser.userId ) || modo)  &&
        <div className='container'>
          <div className='row justify-content-center'>
            <form
              onSubmit={this.onFormSubmit}
              className='container submit-form text-center'
            >
              <div>
                <div className='form-group '>
                  <label htmlFor='titre'>Titre</label>
                  <input
                    type='text'
                    className='form-control col-md-6  offset-md-3 '
                    id='title'
                    required
                    value={currentArticles.titre}
                    onChange={this.onChangeTitle}
                    name='title'
                  />
                </div>

                <div className='form-group '>
                  <label htmlFor='message'>Message</label>
                  <textarea
                    type='text'
                    className='form-control col-md-6  offset-md-3 '
                    id='message'
                    required
                    value={currentArticles.message}
                    onChange={this.onChangeMessage}
                    name='message'
                  />
                </div>
                <div className='form-group col-sm-4 col-md-6  offset-md-3 '>
                  <input
                    type='file'
                    ref={this.fileInput}
                    name='myImage'
                    onChange={this.onChange}
                  />
                </div>

                <div className='container text-center'>
                  <div className='row '>
                    <div className='col-12 text-center'>
                      <button
                        className='mt-1 col-sm-12 col-md-3  btn btn-success '
                        type='submit'
                      >
                        Modifier
                      </button>

                      <button
                        className='mt-1 col-sm-12 col-md-3 offset-md-2 btn btn-danger '
                        onClick={this.deleteArticle}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
      </div>
      }
        </>
    )
  }
}
