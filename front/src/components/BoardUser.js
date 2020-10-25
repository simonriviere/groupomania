import React, { Component } from "react";

import UserService from "../services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);
    this.retrieveArticles = this.retrieveArticles.bind(this);

    this.state = {
      articles: [],
    };
  }
  componentDidMount() {
    this.retrieveArticles();
  }
  retrieveArticles() {
    UserService.getUserBoard()
      .then(response => {
        this.setState({
          articles: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { articles } = this.state;
    return (<div>
      {articles.map(article => (
        <>
          <div className="card"  key={article.id}>
              <div className="card-body">
                <h5 className="card-title" >{article.titre}</h5>
                <p className="card-text">{article.image}</p>
                <p className="card-text" >{article.message}</p>
              </div>
          </div>
        </>
        ))}

        </div>
      );
  }
}

