import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';

export default class Navbar extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <AppBar
                title="Hacker News"
                showMenuIconButton={false} />
        )
    }
}