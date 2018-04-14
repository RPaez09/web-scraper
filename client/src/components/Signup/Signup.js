import React, { Component } from 'react';
import SignupForm from './signupForm';

import Snackbar from 'material-ui/Snackbar';
import { Redirect } from 'react-router';

import API from '../../api';

const email = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);

export default class Signup extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: {
                value: '',
                errorMsg: '',
                isValid: false
            },
            password: {
                value: '',
                errorMsg: '',
                isValid: false
            },
            verifyPassword: {
                value: '',
                errorMsg: '',
                isValid: false
            },
            email: {
                value: '',
                errorMsg: '',
                isValid: false
            },
            submitBtnDisabled: false,
            snackbar: {
                open: false,
                message: ''
            }
        };
    };

    handleUsernameChange = (e) => {
        if( e.target.value === '' ){
            this.setState({
                username: {
                    ...this.state.username,
                        value: e.target.value,
                        errorMsg: 'A username is required',
                        isValid: false
                }
            });
        } else {
            this.setState({
                username: {
                    ...this.state.username,
                        value: e.target.value,
                        errorMsg: '',
                        isValid: true
                }
            });
        }
    };

    handlePasswordChange = (e) => {
        if( e.target.value === '' ){
            this.setState({
                password: {
                    ...this.state.password,
                        value: e.target.value,
                        errorMsg: 'A password is required',
                        isValid: false
                }
            });
        } else {
            this.setState({
                password: {
                    ...this.state.password,
                        value: e.target.value,
                        errorMsg: '',
                        isValid: true
                }
            });
        }
    };

    handleVerifyPasswordChange = (e) => {
        if( e.target.value !== this.state.password.value ){
            this.setState({
                verifyPassword: {
                    ...this.state.verifyPassword,
                        value: e.target.value,
                        errorMsg: 'Passwords must match',
                        isValid: false
                }
            });
        } else {
            this.setState({
                verifyPassword: {
                    ...this.state.verifyPassword,
                        value: e.target.value,
                        errorMsg: '',
                        isValid: true
                }
            });
        }
    };

    handleEmailChange = (e) => {
        if( e.target.value === '' ){
            this.setState({
                email: {
                    ...this.state.email,
                        value: e.target.value,
                        errorMsg: 'A email is required',
                        isValid: false
                }
            });
        } else if( ( email.test( e.target.value ) === false ) ){
            this.setState({
                email: {
                    ...this.state.email,
                        value: e.target.value,
                        errorMsg: 'Please enter a valid email address',
                        isValid: false
                }
            });
        } else {
            this.setState({
                email: {
                    ...this.state.email,
                        value: e.target.value,
                        errorMsg: '',
                        isValid: true
                }
            });
        }
    };

    handleSnackbarClose = () => {
        this.setState({
            snackbar: {
                ...this.state.snackbar,
                open: false,
                message: ''
            }
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if( this.state.username.isValid &&
            this.state.password.isValid &&
            this.state.verifyPassword.isValid &&
            this.state.email.isValid )
            {
                this.setState({
                    submitBtnDisabled: true
                });

                let credentials = {
                    username: this.state.username.value,
                    password: this.state.password.value,
                    email: this.state.email.value
                }

                API.post('/api/user/signup' , credentials)
                    .then( response => {
                        if( response.data.success ){
                            API.post('/api/user/signin', credentials)
                                .then( reply => {
                                    this.props.onLoginSuccess( reply.data.user, reply.data.token );
                                })
                                .catch( error => console.log(error) );
                        } else {
                            this.setState({
                                submitBtnDisabled: false,
                                snackbar : {
                                    ...this.state.snackbar,
                                        open: true,
                                        message: response.data.msg
                                }
                            });
                        }
                    })
                    .catch( error => console.log(error) );
            }
    };

    render(){
        return (
            <React.Fragment>
                { this.props.user.isLoggedIn && <Redirect to="/" push /> }
                <h2>Signup to Hacker News</h2>
                <SignupForm 
                    user={this.state.username}
                    onUsernameChange={this.handleUsernameChange}
                    password={this.state.password}
                    onPasswordChange={this.handlePasswordChange}
                    verifyPassword={this.state.verifyPassword}
                    onVerifyPasswordChange={this.handleVerifyPasswordChange}
                    email={this.state.email}
                    onEmailChange={this.handleEmailChange}
                    submitBtnDisabled={this.state.submitBtnDisabled}
                    onSubmit={this.handleSubmit}/>
                <Snackbar
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                    autoHideDuration={2500}
                    onRequestClose={this.handleSnackbarClose}/>
            </React.Fragment>
        )
    };
}