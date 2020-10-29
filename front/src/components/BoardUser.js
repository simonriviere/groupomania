import React, { Component } from 'react'
import AuthService from '../services/auth.services'
import ArticleDataService from '../services/articles.service'
import { Link } from 'react-router-dom'
export default class BoardUser extends Component {
  constructor (props) {
    super(props)
    this.retrieveArticles = this.retrieveArticles.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.setActiveCommentaire = this.setActiveCommentaire.bind(this);
    this.setOffCommentaire =this.setOffCommentaire.bind(this);

    this.state = {
      articles: [],
      currentCommentaire: null,
      articleId: null,
      commentaire: [],
      userId: 0
    }
  }
  componentDidMount () {
    this.retrieveArticles()
    const user = AuthService.getCurrentUser()
    console.log(user.userId)
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
          articles: response.data,
          currentArticles: response.data
        })
      })
      .catch(e => {
        console.log(e)
      })
  }

  deleteArticle () {
    console.log(this.state.currentArticles.id)
    ArticleDataService.delete(this.state.currentArticles.id)
      .then(response => {
        console.log(response.data)
        this.props.history.push('/articles')
      })
      .catch(e => {
        console.log(e)
      })
  }


  setActiveCommentaire (commentaire, id) {
    console.log(id)
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

  
  render () {
    const {
      articles,
      userId,
      commentaire,
      currentCommentaire,
      articleId
    } = this.state
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
                        onClick={() => this.setOffCommentaire(commentaire)}
                        className='ml-5 btn btn-primary col-3 '
                      >
                        commentaire {article.id}
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          this.setActiveCommentaire(commentaire, article.id)
                        }
                        className='ml-5 btn btn-primary col-3 '
                      >
                        commentaire {article.id}
                      </button>
                    )}

                    <div>
                      {currentCommentaire && articleId === article.id ? (
                        <h3>
                          Voila un commentaire de l'article : {article.id}
                        </h3>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ))}
          <div className='container'></div>
        </div>
      </div>
    )
  }
}
