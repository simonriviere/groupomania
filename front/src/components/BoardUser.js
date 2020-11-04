import React, { Component } from 'react'
import AuthService from '../services/auth.services'
import ArticleDataService from '../services/articles.service'
import CommentaireDataService from '../services/commentaire.service'
import UserService from'../services/user.service'
import Moment from 'react-moment';
import 'moment-timezone';

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
    this.getCommentaire = this.getCommentaire.bind(this)
    this.getAllUser = this.getAllUser.bind(this)

    this.state = {
      articles: [],
      currentCommentaire: null,
      articleId: null,
      viewCommentaire: [],
      userCommentaires: [],
      users : [],
      message: '',
      userId: 0
    }
  }
  componentDidMount() {
    this.retrieveArticles()
    this.getUserCommentaire()
    this.getAllUser()
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

  getAllUser(){
    UserService.getAllUser()
    .then(response => {
      this.setState({
       users : response.data
      });
    })
    .catch(error => {
      console.log(error);
   
    })
  }
  render() {
    const {
      articles,
      userId,
      viewCommentaire,
      userCommentaires,
      currentCommentaire,
      users,
      articleId
    } = this.state

    return (
      <div>      
      <h1 className="text-center">Publications </h1>
        
        <div className='container' >
          {articles &&
            articles.map(article => (
              <div className='card' key={`article_${article.id}`} >
                  <div className='card-body' >
                {users &&
                 users.map(user => ( article.userId === user.id && (
                   <div  key={`user_${user.id}`} >
                     {user.imageProfil &&                      
                  <img
                  src={`${user.imageProfil}`}
                  className='card-text imgProfile'
                  width='50'
                  height='50'
                  alt="utilisateur"
                ></img>
                     }
                   <h3 className="nom"> De {user.nom ? (user.nom + ' ' + user.prenom) : (user.pseudo) }</h3>
                   </div>
                 )))
                }
                <p className="date">Le <Moment format="DD/MM/YYYY à hh:mm ">{article.updatedAt}</Moment></p>
                    <h4 className='card-title  text-center'>{article.titre} </h4>
                    <img
                      src={`${article.image}`}
                      className='card-img'
                      alt="gif fournit par l'utilisateur"
                    ></img>
                    <p className='card-text  text-center'>{article.message}</p>
                    
                  <div className="row justify-content-center">
                    {article.userId === userId && (
                      
                        <Link
                          to={'/articles/' + article.id}
                          className='mt-1 btn btn-success col-lg-3 col-sm-12'
                        >
                          Modifier l'article
                        </Link>
                      
                    )}

                    {currentCommentaire && (articleId === article.id) ? (
                      <button
                      onClick={() => this.setOffCommentaire(viewCommentaire)}
                      className=' mt-1 btn btn-success offset-lg-2 col-lg-3 col-sm-12 '
                      >
                        Masquer les commentaires
                      </button>
                    ) : (
                      <button
                      onClick={() =>
                        this.setActiveCommentaire(viewCommentaire, article.id)
                      }
                      className=' mt-1 btn btn-success offset-lg-2 col-lg-3  col-sm-12  '
                      >
                          Commentaire
                        </button>
                      )}
                      </div>
          
                    <div>
                      {userCommentaires &&
                        userCommentaires.map(commentaire => (
                          <div key={`commente_${commentaire.id}`}>
                            {currentCommentaire &&
                              articleId === commentaire.articleId &&
                              articleId === article.id ? (
                                <div>
                                  <div>
                                    {users &&
                                     users.map(user => ( commentaire.userId === user.id && (
                                  <div  key={`userCom_${user.id}`} >
                                    <h5 className="comme"> Commentaire de {user.nom ? (user.nom + ' ' + user.prenom) : (user.pseudo) }  : </h5> 
                                    </div>
                                    )))
                                    }
                                    <p>
                                      {commentaire.message} 
                                    </p>
                                  
                                    {userId === commentaire.userId  && (
                                      <Link
                                        to={'/commentaire/' + commentaire.id}
                                        className='badge badge-primary '
                                      >
                                        Modifier {commentaire.id}
                                      </Link>
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
              
            ))}
        </div>
       
      </div>
      
    )
  }
}
