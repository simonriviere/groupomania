import React, { Component } from 'react';
import UserDataService from "../services/user.service";
import { Link } from "react-router-dom";


export default class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",

            submitted: false
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePass(e) {
        this.setState({
            password: e.target.value
        });
    }

    saveUser() {
        var data = {
            email: this.state.email,
            password: this.state.password
        };

        UserDataService.signup(data)
            .then(response => {
                this.setState({
                    email: response.data.email,
                    password: response.data.password,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        return (

            <div className="submit-form">

                {this.state.submitted ? (
                    <div>
                        <h4>Utilisateur connecté!</h4>
                        <Link to={"/Article"} className="nav-link">
                            <button className="btn btn-primary"> Voir les articles</button>
                        </Link>

                    </div>
                ) : (
                        <div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    required
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                    name="email"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Mot de passe</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="password"
                                    required
                                    value={this.state.password}
                                    onChange={this.onChangePass}
                                    name="password"
                                />
                            </div>

                            <button onClick={this.saveUser} className="btn btn-success">
                                S'enregistrer
                            </button>
                        </div>)}
            </div>)
    }
}