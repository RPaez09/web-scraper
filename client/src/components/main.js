import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home/Home';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import ArticleDetail from './ArticleDetail/ArticleDetail';

const mainStyles = {
    paddingTop: '80px'
}

export default class Main extends Component {
    render(){
        return (
            <main style={mainStyles}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    
                    <Route exact path="/login" render={()=> (
                        <Login  user={this.props.user}
                                onLoginSuccess={this.props.onLoginSuccess} />)} />
                    
                    <Route exact path="/signup" render={() =>(
                        <Signup user={this.props.user}
                                onLoginSuccess={this.props.onLoginSuccess} />)} />
                    
                    <Route exact path="/article/:id" component={ArticleDetail} />
                </Switch>
            </main>
        )
    }
}