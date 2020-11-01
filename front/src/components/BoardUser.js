import React, { Component } from 'react'
import AuthService from '../services/auth.services'
import ArticleDataService from '../services/articles.service'
import CommentaireDataService from '../services/commentaire.service'

import { Link } from 'react-router-dom'
const user = AuthService.getCurrentUser()
export default class BoardUser extends Component {
  constructor(props) {
    super(props)
    this.retrieveArticles = this.retrieveArticles.bind(this)
    this.setActiveCommentaire = this.setActiveCommentaire.bind(this)
    this.setOffCommentaire = this.setOffCommentaire.bind(this)
    this.getUserCommentaire = this.getUserCommentaire.bind(this)
    this.saveCommentaire = this.saveCommentaire.bind(this)
    this.onChangeCommentaire = this.onChangeCommentaire.bind(this)
    this.deleteCommentaire = this.deleteCommentaire.bind(this)
    this.getCommentaire = this.getCommentaire.bind(this)

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
  componentDidMount() {
    this.retrieveArticles()
    this.getUserCommentaire()
    if (user) {
      this.setState({
        userId: user.userId
      })
    }
  }
  retrieveArticles() {
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

  setActiveCommentaire(commentaire, id) {
    this.setState({
      currentCommentaire: commentaire,
      articleId: id
    })
  }
  setOffCommentaire(commentaire) {
    this.setState({
      currentCommentaire: null
    })
  }
  getUserCommentaire() {
    CommentaireDataService.getAll()
      .then(response => {
        this.setState({
          userCommentaires: response.data
        })
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }
  onChangeCommentaire(e) {
    this.setState({
      message: e.target.value
    })
  }
  saveCommentaire() {
    let data = {
      message: this.state.message,
      userId: user.userId,
      articleId: this.state.articleId
    }
    console.log(data)
    CommentaireDataService.create(data)
      .then(response => {
        this.setState(({
      userCommentaires : [...this.state.userCommentaires, response.data]
        }) )
      })
      .catch(e => {
        console.log(e)
      })
  }
  getCommentaire(id) {
    CommentaireDataService.get(id)
      .then(response => {
        console.log(response.data)
        this.setState({
          userCommentaires: response.data
        })

      })
      .catch(e => {
        console.log(e)
      })
  }
  deleteCommentaire() {
    CommentaireDataService.delete(this.state.userCommentaires.id)
      .then(response => {
        console.log(response.data)
        this.props.history.push('/commentaires')
      })
      .catch(e => {
        console.log(e)
      })
  }
  render() {
    const {
      articles,
      userId,
      viewCommentaire,
      userCommentaires,
      currentCommentaire,
      articleId
    } = this.state

    return (
      <div>
        <div className='container'>
          {articles &&
            articles.map(article => (
              <>
                <div className='card text-center' >

                
                  <div className='card-body' key={article.id}>
                    <h5 className='card-title'>{article.titre} </h5>
                    <img
                      src={`${article.image}`}
                      className='card-img'
                 
                      alt="gif fournit par l'utilisateur"
                    ></img>
                    <p className='card-text'>{article.message}</p>
                    
                  <div className="row justify-content-center">
                    {article.userId === userId && (
                      <>
                        <Link
                          to={'/articles/' + article.id}
                          className='mt-1 btn btn-primary col-lg-3 col-sm-12'
                        >
                          Modifier l'article
                        </Link>
                      </>
                    )}

                    {currentCommentaire && articleId === article.id ? (
                      <button
                      onClick={() => this.setOffCommentaire(viewCommentaire)}
                      className=' mt-1 btn btn-primary offset-lg-2 col-lg-3 col-sm-12 '
                      >
                        Masquer les commentaires
                      </button>
                    ) : (
                      <button
                      onClick={() =>
                        this.setActiveCommentaire(viewCommentaire, article.id)
                      }
                      className=' mt-1 btn btn-primary offset-lg-2 col-lg-3  col-sm-12  '
                      >
                          Commentaire
                        </button>
                      )}

                      </div>
                    <div>
                      {userCommentaires &&
                        userCommentaires.map(commentaire => (
                          <div key={commentaire.id}>
                            {currentCommentaire &&
                              articleId === commentaire.articleId &&
                              articleId === article.id ? (
                                <div>
                                  <div>
                                    <h5> Commentaire de {commentaire.userId} : </h5>
                                    <p>
                                      {commentaire.message}
                                      <br />
                                    </p>
                                    {userId === commentaire.userId ? (
                                      <Link
                                        to={'/commentaire/' + commentaire.id}
                                        className='badge badge-primary '
                                      >
                                        Modifier {commentaire.id}
                                      </Link>

                                    ) : (
                                        <div></div>
                                      )}

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
                          className='btn btn-success mt-3'
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
