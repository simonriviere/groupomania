import React, { Component } from 'react'
import UserService from '../services/user.service'
import AuthService from '../services/auth.services'
import { put } from 'axios'

const user = AuthService.getCurrentUser()

export default class EditArticle extends Component {
    constructor(props) {
        super(props)
        this.fileInput = React.createRef()

        this.getUser = this.getUser.bind(this)
        this.saveProfile = this.saveProfile.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChangeNom = this.onChangeNom.bind(this)
        this.onChangePrenom = this.onChangePrenom.bind(this)
        this.onChangeImage = this.onChangeImage.bind(this)
        this.state = {
            currentUser: {
                id: null,
                nom: "",
                prenom: "",
                sexe: "",
                image: null,
                message: '',
                userId: '',
                articleId: ''
            }

        }
    }

    componentDidMount() {
        this.getUser(this.props.match.params.id)
    }


    onChangeNom(e) {
        const nom = e.target.value
        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    nom: nom
                }
            }
        })
    }
    onChangePrenom(e) {
        const prenom = e.target.value
        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    prenom: prenom
                }
            }
        })
    }
    onChangeImage(e) {
        this.setState({
            file: e.target.files[0].name
        })
    }
    onFormSubmit(e) {
        e.preventDefault() // Stop form submit
        this.saveProfile(this.state.file).then(response => {
            console.log(response.data)
            window.location.href = '/profile'

        })
    }
    getUser(id) {
        UserService.getUser(id)
            .then(response => {
                this.setState({
                    currentUser: response.data
                })
                console.log(this.state.currentUser.id)
            })
            .catch(e => {
                console.log(e)
            })
    }

    saveProfile() {
        console.log(this.state.currentUser.id)
        const url = `http://localhost:3000/api/auth/${this.state.currentUser.id}`
        const formData = new FormData()
        formData.append('nom', this.state.currentUser.nom)
        formData.append('prenom', this.state.currentUser.prenom)
        formData.append('imageProfil', this.fileInput.current.files[0])

        /*         formData.append('message', this.state.currentArticles.message)
                formData.append('userId', user.userId)
                formData.append('image', this.fileInput.current.files[0]) */
        const config = {
            headers: {
                authorization: 'token ' + user.token,
                'content-type': 'multipart/form-data'
            }
        }

        return put(url, formData, config)
    }

    render() {
        const { currentUser } = this.state
        return (
            <>
                <div className='container'>
                    <div className='row justify-content-center'></div>
                    <form onSubmit={this.onFormSubmit} className='container submit-form text-center'>
                        <div>
                            <div className='form-group '>
                                <label htmlFor='message'>Nom</label>
                                <input
                                    type='text'
                                    className='form-group col-md-6    '
                                    id='nom'
                                    required
                                    value={currentUser.nom}
                                    onChange={this.onChangeNom}
                                    name='nom'
                                />
                            </div>
                            <div className='form-group '>
                                <label htmlFor='message'>Prénom</label>
                                <input
                                    type='text'
                                    className='form-group col-md-6   '
                                    id='prenom'
                                    required
                                    value={currentUser.prenom}
                                    onChange={this.onChangePrenom}
                                    name='prenom'
                                />
                            </div>
                            <div className='form-group col-md-6  offset-md-3  '>
                                <label htmlFor='image'>Photo de profile</label>
                                <input
                                    type='file'
                                    ref={this.fileInput}
                                    name='myImage'
                                    onChange={this.onChangeImage}
                                />
                            </div>
                            <div className='container text-center'>
                                <div className='row '>
                                    <div className='col-12 text-center'>
                                        <button
                                            className='mt-1 col-sm-12 col-md-3  btn btn-success '
                                            type='submit'
                                        >
                                            Modifier
                                    </button>

                            
                                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
    
        </>
        )
    }
}
