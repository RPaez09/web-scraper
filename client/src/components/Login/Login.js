import React, { Component } from 'react';
import LoginForm from './loginForm';

import Snackbar from 'material-ui/Snackbar';
import { Redirect } from 'react-router';

import API from '../../api';

export default class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            usernameError: '',
            userValid: false,
            password: '',
            passwordError: '',
            passwordValid: false,
            submitBtnDisabled: false,
            snackbar: {
                open: false,
                message: ''
            }
        }
    }

    handleUsernameChange = (e) => {
        if( e.target.value === "" ){
            this.setState({
                username: e.target.value,
                usernameError: "A username is required.",
                userValid: false
            });
        } else {
            this.setState({
                username: e.target.value,
                usernameError: "",
                userValid: true
            });
        }
    }

    handlePasswordChange = (e) => {

        if( e.target.value === "" ){
            this.setState({
                password: e.target.value,
                passwordError: "A password is required",
                passwordValid: false
            });
        } else {
            this.setState({
                password: e.target.value,
                passwordError: "",
                passwordValid: true
            });
        }

    }

    handleSnackbarClose = () => {
        this.setState({
            snackbar: {
                ...this.state.snackbar,
                open: false,
                message: ''
            }
        });
    }

    onLoginSuccess = (payload) => {
        this.props.onLoginSuccess(payload);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if( this.state.userValid && this.state.passwordValid ){            
            
            this.setState({
                submitBtnDisabled: true
            });

            let credentials = {
                username: this.state.username,
                password: this.state.password
            };

            API.post('/api/user/signin', credentials)
                .then( ( response ) => {

                    if( response.data.success ){
                        let options = { headers: { authorization: response.data.token } };

                        API.get(`/api/favorites/${response.data.user.id}`, options)
                            .then( favorites => {
                                let parsedFavorites = favorites.data.map( article => article._id );
                                this.props.onLoginSuccess( response.data.user, response.data.token, parsedFavorites ) 
                            })
                            .catch( error => {
                                console.log(error);
                            });

                    } else {
                        this.setState({
                            submitBtnDisabled : false,
                            snackbar: {
                                ...this.state.snackbar,
                                open: true,
                                message: response.data.msg
                            }
                        });
                    }

                })
                .catch( err => console.log( err ) );
        }
    }

    render(){
        return (
        <React.Fragment>
            { this.props.user.isLoggedIn && <Redirect to="/" push /> }
            <h2>Login to Hacker News</h2>
            <LoginForm 
                onSubmit={this.handleSubmit}
                submitBtnDisabled={this.state.submitBtnDisabled}
                username={this.state.username}
                onUsernameChange={this.handleUsernameChange}
                usernameError={this.state.usernameError}
                password={this.state.password}
                onPasswordChange={this.handlePasswordChange}
                passwordError={this.state.passwordError}/>
            <Snackbar
                open={this.state.snackbar.open}
                message={this.state.snackbar.message}
                autoHideDuration={2500}
                onRequestClose={this.handleSnackbarClose} />
        </React.Fragment>)
    }
}