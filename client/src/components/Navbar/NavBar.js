import React from 'react';

import { withRouter } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import RightButton from './rightButton';

const NavbarStyles = {
    position: "fixed"
}

const TitleStyles = {
    cursor: "pointer",
    marginLeft: "0",
    flex: "none"
};

const Navbar = ( { history, user } ) => {
    return (
        <AppBar
            title={<span> Hacker News</span>}
            showMenuIconButton={false}
            style={NavbarStyles}
            titleStyle={TitleStyles}
            onTitleClick={() => history.push('/')}
            iconElementRight={<RightButton user={user} />} />
    )
}

export default withRouter(Navbar);