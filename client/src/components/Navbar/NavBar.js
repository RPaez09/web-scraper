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

const Navbar = ( { history, user, onLogout, openMenu } ) => {
    return (
        <AppBar
            title={<span> Hacker News</span>}
            style={NavbarStyles}
            titleStyle={TitleStyles}
            onTitleClick={() => history.push('/')}
            onLeftIconButtonClick={openMenu}
            iconElementRight={<RightButton 
                                user={user}
                                onLogout={onLogout} />} />
    )
}

export default withRouter(Navbar);