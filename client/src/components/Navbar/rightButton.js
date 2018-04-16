import React from 'react';

import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';

const style = {
    color: "#FFFFFF",
    marginTop: "5px"
}

const RightButton = (props) => {
    return (
        (!props.user.isLoggedIn)? <Link to="/login"><FlatButton label="Login" style={style} /></Link> 
                                : <FlatButton label={props.user.username} style={style} />
    )
};

export default RightButton;