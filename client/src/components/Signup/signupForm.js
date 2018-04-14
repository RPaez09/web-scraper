import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const loginBtnStyles = {
    marginTop: "50px",
    marginLeft: "5px"
}

const signUpBtnStyles = {
    marginTop: "50px"
}

const SignupForm = (props) => {
    return (
        <form>
            <TextField
                autoFocus
                floatingLabelText="Username"
                onChange={props.onUsernameChange}
                errorText={props.user.errorMsg}
                value={props.user.value} /><br/>
            <TextField
                floatingLabelText="Password"
                type="password"
                onChange={props.onPasswordChange}
                errorText={props.password.errorMsg}
                value={props.password.value} /><br/>
            <TextField
                floatingLabelText="Verify Password"
                type="password"
                onChange={props.onVerifyPasswordChange}
                errorText={props.verifyPassword.errorMsg}
                value={props.verifyPassword.value} /><br/>
            <TextField 
                floatingLabelText="Email"
                type="email"
                onChange={props.onEmailChange}
                errorText={props.email.errorMsg}
                value={props.email.value}/><br/>
            <RaisedButton 
                label="Signup"
                type="submit"
                primary={true}
                style={signUpBtnStyles}
                onClick={props.onSubmit}
                disabled={props.submitBtnDisabled}/> or 
            <a href="/login">
                <RaisedButton 
                    label="Login"
                    style={loginBtnStyles}/>
            </a>
        </form>
    )
}

export default SignupForm;