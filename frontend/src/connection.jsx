import React, { Component } from 'react'
import { Post } from './bdd/post.js'
import { allArticles } from './bdd/post.js'
//function pour utiliser bootstrap
function Field({ name, value, onChange, children }) {
    return <div className="form-group mt-4">
        <label htmlFor={name}>{children}</label>
        <input type="text" value={value} onChange={onChange} id={name} name={name} className="form-control" />
    </div>
}

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: value
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        const data = JSON.stringify(this.state)
        Post(data, "http://localhost:3000/api/auth/login")
        allArticles('http://localhost:3000/api/articles')
    }
    render() {
        return <div>
            <h2>Se connecter</h2>
        <form className="container" onSubmit={this.handleSubmit}>
            <Field name="email" value={this.state.email} onChange={this.handleChange}>Email</Field>
            <Field name="password" value={this.state.password} onChange={this.handleChange}>Mot de passe</Field>
            <div className="form-group ">
                <button className="btn btn-primary">Envoyer</button>
            </div>

        </form>
        </div>
    }
}


