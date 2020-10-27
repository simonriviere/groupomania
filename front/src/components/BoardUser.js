import React, { Component } from "react";
import {  Link } from "react-router-dom";

import ArticleDataService from "../services/articles.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);
    this.retrieveArticles = this.retrieveArticles.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this)
    this.state = {
      articles: [],
      currentArticles: null,
    };
  }
  componentDidMount() {
    this.retrieveArticles();
  }
  retrieveArticles() {
    ArticleDataService.getAll()
      .then(response => {
        this.setState({
          articles: response.data,
          currentArticles : response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteArticle(){
    console.log(this.state.currentArticles.id)
    ArticleDataService.delete(this.state.currentArticles.id)
    .then(response => {
      console.log(response.data);
      this.props.history.push('/articles')
    })
    .catch(e => {
      console.log(e);
    });
  } 

  render() {
    const { articles } = this.state;
   
    return (<div>
      {articles && articles.map(article => (
        <>
          <div className="card"  key={article.id}>
              <div className="card-body">
                <h5 className="card-title" >{article.titre}</h5>
                <img src={`${article.image}`} className="card-text" width="500" height="450" alt="gif fournit par l'utilisateur"  ></img>
                <p className="card-text" >{article.message}</p>
 
              </div>
              <Link
                to={"/articles/" + article.id}
                className="badge badge-warning"
              >
               Modifier {article.id}
              </Link>

          </div>
        </>
        ))}
     {/*            <div className="container mt-3">
          <Switch>
          <Route path="/articles/:id" component={EditArticle} />
          </Switch>
        </div> */}
               
        </div>
      );
  }
}

