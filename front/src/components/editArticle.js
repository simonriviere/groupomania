import React, { Component } from 'react'
import ArticleDataService from '../services/articles.service'

export default class EditArticle extends Component {
  constructor (props) {
    super(props)
    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeMessage = this.onChangeMessage.bind(this)
    this.onChangeImage = this.onChangeImage.bind(this)
    this.getArticle = this.getArticle.bind(this)
    this.updateArticle = this.updateArticle.bind(this)
    this.deleteArticle = this.deleteArticle.bind(this)

    this.state = {
      currentArticles: {
        id: null,
        titre: '',
        message: '',
        image: '',
        userId: '',
        submitted: false
      }
    }
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
  onChangeImage (e) {
    const image = e.target.value

    this.setState(function (prevState) {
      return {
        currentArticles: {
          ...prevState.currentArticles,
          image: image
        }
      }
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

  updateArticle () {
    ArticleDataService.update(
      this.state.currentArticles.id,
      this.state.currentArticles
    )
      .then(response => {
        console.log(response.data)
        this.setState({
          message: 'The Article was updated successfully!'
        })
      })
      .catch(e => {
        console.log(e)
      })
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

    return (
      <div className='container submit-form '>
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
            <label htmlFor='image'>Votre gif</label>
            <input
              type='file'
              ref={this.fileInput}
              name='myImage'
              encType='multipart/form-data'
              onChange={this.onChangeImage}
            />
          </div>
          <div className='container text-center'>
            <div className='row '>
             <div className="col-12 text-center">
                  <button
                onClick={this.updateArticle}
                className=' col-3 mt-4 btn btn-success'
              >
                Modifier
              </button>
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
      </div>
    )
  }
}
