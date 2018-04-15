import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

const loginBtnStyles = {
    marginTop: "50px"
}

const signUpBtnStyles = {
    marginTop: "50px",
    marginLeft: "5px"
}

const LoginForm = (props) => {
    return (
        <form>
            <TextField
                autoFocus
                floatingLabelText="Username"
                onChange={props.onUsernameChange}
                errorText={props.usernameError} />
            <br/>
            <TextField
                floatingLabelText="Password"
                type="password"
                onChange={props.onPasswordChange} 
                errorText={props.passwordError} />
            <br />
            <RaisedButton 
                label="Login" 
                type="submit"
                primary={true} 
                style={loginBtnStyles}
                onClick={props.onSubmit}
                disabled={props.submitBtnDisabled} /> or 
            <Link to="/signup">
                <RaisedButton 
                    label="Sign Up"
                    style={signUpBtnStyles}/>
            </Link>
        </form>
    );
}

export default LoginForm;