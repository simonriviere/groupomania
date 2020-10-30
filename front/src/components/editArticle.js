import React, { Component } from 'react'
import ArticleDataService from '../services/articles.service'
import { Link } from 'react-router-dom'
import axios, { put } from 'axios';

export default class EditArticle extends Component {
  constructor (props) {
    super(props)
    this.fileInput = React.createRef();

    this.state = {
      currentArticles: {
        id: null,
        titre: '',
        message: '',
        image: null,
        userId: '',
        submitted: false
      }
    }

    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeMessage = this.onChangeMessage.bind(this)
    this.onChange = this.onChange.bind(this)
    this.getArticle = this.getArticle.bind(this)
    this.updateArticle = this.updateArticle.bind(this)
    this.deleteArticle = this.deleteArticle.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this);

  }

  componentDidMount () {
    this.getArticle(this.props.match.params.id)
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
  onFormSubmit(e) {
    e.preventDefault() // Stop form submit
    this.updateArticle(this.state.file).then((response) => {
      console.log(response.data);
    })
  }
  onChange(e) {
    this.setState( {
      file : e.target.files[0].name
    })
  }
  getArticle (id) {
    ArticleDataService.get(id)
      .then(response => {
        this.setState({
          currentArticles: response.data
        })
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  updateArticle() {
    const url = `http://localhost:3000/api/articles/${this.state.currentArticles.id}`
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({submitted : true});
    const formData = new FormData();
    formData.append('titre', this.state.currentArticles.titre)
    formData.append('message', this.state.currentArticles.message)
    formData.append('userId', user.userId)
    formData.append('image', this.fileInput.current.files[0])
    const config = {
      
      headers: {
        'authorization': 'token '+ user.token,
          'content-type': 'multipart/form-data'
      }
    }
    return  put(url, formData,config)
  }

  deleteArticle () {
    ArticleDataService.delete(this.state.currentArticles.id)
      .then(response => {
        if (window.confirm('Voulez-vous supprimer votre article?')) {
          this.props.history.push('/articles')
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  render () {
    
    const { currentArticles } = this.state
    console.log( this.state.currentArticles)
    return (
      <form onSubmit={this.onFormSubmit}  className='container submit-form '>
        <div>
          <div className='form-group '>
            <label htmlFor='titre'>Titre</label>
            <input
              type='text'
              className='form-control col-6 '
              id='title'
              required
              value={currentArticles.titre}
              onChange={this.onChangeTitle}
              name='title'
            />
          </div>

          <div className='form-group '>
            <label htmlFor='message'>Message</label>
            <input
              type='text'
              className='form-control col-6 '
              id='message'
              required
              value={currentArticles.message}
              onChange={this.onChangeMessage}
              name='message'
            />
          </div>
          <div className='form-group col-6 '>
          <input
              type='file'
              ref={this.fileInput}
              name='myImage'
              onChange={this.onChange}
            />
          </div>    
           <button className="btn btn-primary" type="submit">Télécharger</button>
          <div className='container text-center'>

            <div className='row '>
            <div className="col-12 text-center">
                  <Link
                onClick={this.updateArticle}
                to={'/articles/'}
                className=' col-3 mt-4 btn btn-success'
                type="submit"
              >
                Modifier
              </Link>
         

              <button

                className='col-3 mt-4 ml-4 btn btn-danger'
                onClick={this.deleteArticle}
              >
                Supprimer
            
              </button>
          
             </div>
             
            </div>
          </div>
        </div>
      </form>
    )
  }
}
