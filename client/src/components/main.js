import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home/Home';
import Login from './Login/Login';
import ArticleDetail from './ArticleDetail/ArticleDetail';

export default class Main extends Component {
    render(){
        return (
            <main>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" render={()=> (
                        <Login  user={this.props.user}
                                onLoginSuccess={this.props.onLoginSuccess} />)} />
                    <Route exact path="/article/:id" component={ArticleDetail} />
                </Switch>
            </main>
        )
    }
}