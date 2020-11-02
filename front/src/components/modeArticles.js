import React, { Component } from 'react'
import ArticleDataService from '../services/articles.service'
import { Link } from 'react-router-dom'


export default class BoardUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: null,
            commentaires: []
        }

        this.retrieveArticles = this.retrieveArticles.bind(this)
    }

    componentDidMount() {
        this.retrieveArticles()
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
                localStorage.removeItem("user");
                this.props.history.push('/login')
                window.location.reload()
            })
    }

    render() {
        const { articles } = this.state
        return (

            <>
                <div className="container-fluid">
                    <h3>Résumé des articles</h3>
                    <div className="table-responsive-sm">
                        <table className="table table-bordered ">
                            <thead className="table-info">
                                <tr>
                                    <th>Titre</th>
                                    <th>Message</th>
                                    <th>Voir</th>
                                    <th>User Id</th>
                                    <th>Création</th>
                                    <th>Modification</th>


                                </tr>
                            </thead>
                            <tbody>
                                {articles &&
                                    articles.map(article => (
                                        <tr key={`verifCom_${article.id}`}>
                                            <td>{article.titre}</td>
                                            <td>{article.message}</td>
                                            <td>
                                                <Link to={'/articles/' + article.id}>
                                                    N° {article.id}
                                                </Link>
                                            </td>
                                            <td>{article.userId}</td>
                                            <td>{article.createdAt}</td>
                                            <td>{article.updatedAt}</td>

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
