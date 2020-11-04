import React, { Component } from 'react'
import CommentaireDataService from '../services/commentaire.service'
import { Link } from 'react-router-dom'


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
        localStorage.removeItem("user");
        this.props.history.push('/login')
        window.location.reload()
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
          <tbody>
          {commentaires &&
            commentaires.map(commentaire => (
                  <tr key={`verifCom_${commentaire.id}`}>
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
                
              
            ))}
          </tbody>
        </table>
      </div>
       
      </div>
    </>
    )
  }
}
