import React, { Component } from 'react';
import LoginForm from './loginForm';

import API from '../../api';

export default class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            usernameError: '',
            password: '',
            passwordError: '',
            submitBtnDisabled: false
        }
    }

    handleUsernameChange = (e) => {
        this.setState({
            username: e.target.value,
            usernameError: "",
            passwordError: ""
        });
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value,
            usernameError: "",
            passwordError: ""
        });
    }

    handleSubmit = ( e, payload ) => {
        e.preventDefault();

        this.setState({
            submitBtnDisabled: true
        });

        console.log("Submitted");
        console.log( payload );

        API.post('/api/signin');
    }

    render(){
        return (
        <React.Fragment>
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
        </React.Fragment>)
    }
}