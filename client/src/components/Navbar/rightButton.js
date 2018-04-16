import React from 'react';

import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';

const LoginStyles = {
    color: "#FFFFFF",
    marginTop: "5px"
}

const RightButton = (props) => {
    return (
        <Link to="/login"><FlatButton label="Login" style={LoginStyles} /></Link>
    )
};

export default RightButton;