import React, { Component } from 'react'
import CommentaireDataService from '../services/commentaire.service'
import AuthService from '../services/auth.services'
import { Link } from 'react-router-dom'

const user = AuthService.getCurrentUser()

export default class BoardUser extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: null,
      commentaires: []
    }

    this.retrieveCommentaire = this.retrieveCommentaire.bind(this)
  }

  componentDidMount() {
    this.retrieveCommentaire()
  }

  retrieveCommentaire() {
    CommentaireDataService.getAll()
      .then(response => {
        this.setState({

          commentaires: response.data
        })
      })
      .catch(e => {
        console.log(e)
      })
  }

  render() {
    const { commentaires } = this.state
    return (

      <>
      <div className="container-fluid">
         <h3>Résumé des commentaires</h3>
        <div className="table-responsive-sm">
        <table className="table table-bordered ">
          <thead className="table-info">
            <tr>
              <th>Message</th>
              <th >Article Id</th>
               <th>Voir</th> 
              <th>User Id</th>
               <th>Création</th>
              <th>Modification</th>
            

            </tr>
          </thead>
          {commentaires &&
            commentaires.map(commentaire => (
              <>
                <thead>
                  <tr>
                    <td>{commentaire.message}</td>
                    <td>{commentaire.articleId}</td>
                    <td>

                      <Link to={'/commentaire/' + commentaire.id}>
                        N° {commentaire.id}
                      </Link>
                    </td>
                    <td>{commentaire.userId}</td>
                    <td>{commentaire.createdAt}</td>
                    <td>{commentaire.updatedAt}</td>

                  </tr>
                </thead>
              </>
            ))}
        </table>
      </div>
       
      </div>
    </>
    )
  }
}
