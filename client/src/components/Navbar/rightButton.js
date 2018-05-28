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

    toggleMenu = e => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    onLogout = e => {
        this.toggleMenu();
        this.props.onLogout();
    };

    render(){
        return (
            (!this.props.user.isLoggedIn)   ? <Link to="/login"><FlatButton label="Login" style={style} /></Link> 
                                            : <IconMenu
                                                    iconButtonElement={<FlatButton label={this.props.user.username} style={style} />}
                                                    open={this.state.isOpen}
                                                    onRequestChange={this.handleOnRequestChange}
                                                    targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                                    onClick={this.toggleMenu} >
                                                    <Link to="/saved" style={linkStyle} onClick={this.toggleMenu}><MenuItem
                                                        primaryText="Saved Articles"/></Link>
                                                    <MenuItem 
                                                        primaryText="Logout"
                                                        onClick={this.onLogout} />
                                                </IconMenu>
        )
    }
};