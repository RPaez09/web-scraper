import React from 'react';

import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const TitleStyles = {
    cursor: "pointer",
    marginLeft: "0",
    flex: "none"
};

const LoginStyles = {
    color: "#FFFFFF",
    marginTop: "5px"
}

const Navbar = ( { history } ) => {
    return (
        <AppBar
            title={<span> Hacker News</span>}
            showMenuIconButton={false}
            titleStyle={TitleStyles}
            onTitleClick={() => history.push('/')}
            iconElementRight={<Link to="/login"><FlatButton label="Login" style={LoginStyles} /></Link>} />
    )
}

export default withRouter(Navbar);