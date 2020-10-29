import React, { Component } from 'react'
import AuthService from '../services/auth.services'
import ArticleDataService from '../services/articles.service'
import CommentaireDataService from '../services/commentaire.service'

import { Link } from 'react-router-dom'
const user = AuthService.getCurrentUser()
export default class BoardUser extends Component {
  constructor (props) {
    super(props)
    this.retrieveArticles = this.retrieveArticles.bind(this)
    this.setActiveCommentaire = this.setActiveCommentaire.bind(this)
    this.setOffCommentaire = this.setOffCommentaire.bind(this)
    this.getUserCommentaire = this.getUserCommentaire.bind(this)
    this.saveCommentaire = this.saveCommentaire.bind(this)
    this.onChangeCommentaire = this.onChangeCommentaire.bind(this)

    this.state = {
      articles: [],
      currentCommentaire: null,
      articleId: null,
      viewCommentaire: [],
      userCommentaires: [],
      message: '',
      userId: 0
    }
  }
  componentDidMount () {
    this.retrieveArticles()
    this.getUserCommentaire()
    if (user) {
      this.setState({
        userId: user.userId
      })
    }
  }
  retrieveArticles () {
    ArticleDataService.getAll()
      .then(response => {
        this.setState({
          articles: response.data
          //currentArticles: response.data
        })
      })
      .catch(e => {
        console.log(e)
      })
  }

  setActiveCommentaire (commentaire, id) {
    this.setState({
      currentCommentaire: commentaire,
      articleId: id
    })
  }
  setOffCommentaire (commentaire) {
    this.setState({
      currentCommentaire: null
    })
  }
  getUserCommentaire () {
    console.log('ol')
    CommentaireDataService.getAll()
      .then(response => {
        this.setState({
          userCommentaires: response.data
        })
      })
      .catch(e => {
        console.log(e)
      })
  }
  onChangeCommentaire (e) {
    this.setState({
      message: e.target.value
    })
  }
  saveCommentaire () {
    let data = {
      message: this.state.message,
      userId: user.userId,
      articleId: this.state.articleId
    }
    console.log(data)
    CommentaireDataService.create(data)
      .then(response => {
        this.setState({
          message: response.data.message
        })
      })
      .catch(e => {
        console.log(e)
      })
  }

  render () {
    const {
      articles,
      userId,
      viewCommentaire,
      userCommentaires,
      currentCommentaire,
      articleId
    } = this.state
    console.log(userCommentaires.length)
    return (
      <div>
        <div className='container'>
          {articles &&
            articles.map(article => (
              <>
                <div className='card text-center' key={article.id}>
                  <div className='card-body'>
                    <h5 className='card-title'>{article.titre}</h5>
                    <img
                      src={`${article.image}`}
                      className='card-text'
                      width='500'
                      height='450'
                      alt="gif fournit par l'utilisateur"
                    ></img>
                    <p className='card-text'>{article.message}</p>

                    {article.userId === userId && (
                      <>
                        <Link
                          to={'/articles/' + article.id}
                          className='btn btn-primary col-3'
                        >
                          Modifier {article.id}
                        </Link>
                      </>
                    )}

                    {currentCommentaire && articleId === article.id ? (
                      <button
                        onClick={() => this.setOffCommentaire(viewCommentaire)}
                        className='ml-5 btn btn-primary col-3 '
                      >
                        Masquer les commentaires
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          this.setActiveCommentaire(viewCommentaire, article.id)
                        }
                        className='ml-5 btn btn-primary col-3 '
                      >
                        Voir les {userCommentaires.length} commentaires
                      </button>
                    )}

                    <div>
                      {userCommentaires &&
                        userCommentaires.map(commentaire => (
                          <div>
                            {currentCommentaire &&
                            articleId === commentaire.articleId &&
                            articleId === article.id ? (
                              <div>
                                <div>
                                  <p>
                                    Pseudo : {commentaire.userId} Message :{' '}
                                    {commentaire.message}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        ))}
                    </div>
                    {currentCommentaire && articleId === article.id ? (
                      <div className='form-group'>
                        <label htmlFor='Commentaire'>Un petit mot ? </label>
                        <input
                          type='text'
                          className='form-control'
                          id='commentaire'
                          required
                          value={this.state.commentaire}
                          onChange={this.onChangeCommentaire}
                          name='commentaire'
                        />
                        <button
                          onClick={this.saveCommentaire}
                          className='btn btn-success'
                        >
                          Poster
                        </button>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    )
  }
}
