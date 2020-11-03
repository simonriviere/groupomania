import React, { Component } from "react";
import { Link } from "react-router-dom";
import  { post } from 'axios';

export default class AddArticle extends Component {

  constructor(props) {
    super(props);

    this.fileInput = React.createRef();

    this.state = {
      id: null,
      titre: "",
      message: "",
      image: null,
      userId: "",
      submitted: false
    };

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submittedFalse = this.submittedFalse.bind(this);
  }

  onChangeTitle(e) {
    this.setState({
      titre: e.target.value
    });
  }
  onChangeMessage(e) {
    this.setState({
      message: e.target.value
    });
  }
  onFormSubmit(e) {
    e.preventDefault() // Stop form submit
    this.saveArticle(this.state.file).then((response) => {
      console.log(response.data);
    })
  }
  onChange(e) {
    this.setState({ file : e.target.files[0].name })
  }
  submittedFalse(e){
    this.setState({
      submitted: false
    })
  }
  saveArticle() {
    const url = "http://localhost:3000/api/articles"
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({submitted : true});
    const formData = new FormData();
    formData.append('titre', this.state.titre)
    formData.append('message', this.state.message)
    formData.append('userId', user.userId)

    formData.append('image',  this.fileInput.current.files[0])
    const config = {
      
      headers: {
        'authorization': 'token '+ user.token,
          'content-type': 'multipart/form-data'
      }
    }
    return  post(url, formData,config)
    //ArticleDataService.create(formData)
  }


  render() {

    return (

      <form onSubmit={this.onFormSubmit} className="submit-form">
   {this.state.submitted ? (
          <div>
            <h4>Votre article est bien enregistré !</h4>
            <Link to={'/articles/'} className="btn btn-success" onClick={this.submittedFalse}>
            Voir les articles
              </Link>
          </div>
        ) : (
        <div>
          <div className="form-group">
            <label htmlFor="titre">Titre</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={this.state.titre}
              onChange={this.onChangeTitle}
              name="title"

            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              type="text"
              className="form-control"
              id="message"
              required
              value={this.state.Message}
              onChange={this.onChangeMessage}
              name="message"

            />
          </div>
          <div className="form-group">
         
            <input
              type="file"
              ref={this.fileInput} 
              name="myImage"
              required
              onChange={this.onChange} />
          </div>
      <button className="mt-1 col-sm-12 col-md-3  btn btn-success" type="submit">Télécharger</button>
        
        </div>
        )}
      </form>
    );
  }
}