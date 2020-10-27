import React, { Component } from "react";
import ArticleDataService from "../services/articles.service";

const user = JSON.parse(localStorage.getItem('user'));

export default class AddArticle extends Component {

  constructor(props) {
    super(props);

    this.fileInput = React.createRef();

    this.state = {
      id: null,
      titre: "",
      message: "",
      image: "",
      userId: "",
      submitted: false
    };

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
    this.newArticle = this.newArticle.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
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
  onChangeImage(e) {
    this.setState({
      image: e.target.value
    });
  }

  saveArticle() {
    var data = {
      titre: this.state.titre,
      message: this.state.message,
      image: this.fileInput.current.files[0].name,
      userId: user.userId
    };
    console.log(data)
    ArticleDataService.create(data)
        .then(response => {
          this.setState({
            titre: response.data.titre,
            message: response.data.message,
            image: response.data.image,
            userId: user.userId,
            
            submitted: true
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
  }

  newArticle() {
    this.setState({
      id: null,
      titre: "",
      message: "",
      image: "",

      submitted: false
    });
  }

  render() {
    return (

      <div className="submit-form">

        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
                </button>
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
                <input
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
                <label htmlFor="image">Votre gif</label>
                <input type="file" ref={this.fileInput} name="myImage" encType="multipart/form-data" onChange={this.onChangeImage} />
              </div>

              <button onClick={this.saveArticle} className="btn btn-success">
                Submit
                </button>
            </div>
          )}
      </div>
    );
  }
}