import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const style = {
    color: "#FFFFFF",
    marginTop: "5px"
};

const linkStyle = {
    textDecoration: 'none'
};

export default class RightButton extends Component {

    constructor(props){
        super(props)

        this.state = {
            isOpen: false
        }
    };

    render(){
        return (
            (!this.props.user.isLoggedIn)   ? <Link to="/login"><FlatButton label="Login" style={style} /></Link> 
                                            : <IconMenu
                                                    iconButtonElement={<FlatButton label={this.props.user.username} style={style} />}
                                                    open={this.state.openMenu}
                                                    onRequestChange={this.handleOnRequestChange}
                                                    targetOrigin={{horizontal: 'left', vertical: 'bottom'}} >
                                                    <Link to="/saved" style={linkStyle}><MenuItem
                                                        primaryText="Saved Articles"/></Link>
                                                    <MenuItem 
                                                        primaryText="Logout"
                                                        onClick={this.props.onLogout} />
                                                </IconMenu>
        )
    }
};