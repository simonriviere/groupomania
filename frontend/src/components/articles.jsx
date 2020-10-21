import React, { Component } from 'react'


export class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      article: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/articles", {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'token ' + localStorage.getItem('token'),
      }
   })
      .then(res => res.json())
      .then(
        (article) => {
          
          this.setState({
            isLoaded: true,
            articles: article
          });
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, articles } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
        return (
        <ul>
          {articles.map(article => (
           <li key={article }>
              {article.titre}
            </li>
          ))}
        </ul>
      );
    }
  }
}