import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home/Home';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import ArticleDetail from './ArticleDetail/ArticleDetail';
import SavedArticles from './SavedArticles/SavedArticles';

const mainStyles = {
    paddingTop: '80px',
    minHeight: '50vh'
}

export default class Main extends Component {
    render(){
        return (
            <main style={mainStyles}>
                <Switch>
                    <Route exact path="/" render={() => (
                        <Home   user={this.props.user}
                                handleSave={this.props.handleSave}
                                onSnackbarMessage={this.props.onSnackbarMessage} /> )} />
                    
                    <Route exact path="/login" render={()=> (
                        <Login  user={this.props.user}
                                onLoginSuccess={this.props.onLoginSuccess}
                                onSnackbarMessage={this.props.onSnackbarMessage} />)} />
                    
                    <Route exact path="/signup" render={() =>(
                        <Signup user={this.props.user}
                                onLoginSuccess={this.props.onLoginSuccess} 
                                onSnackbarMessage={this.props.onSnackbarMessage} />)} />
                    
                    <Route exact path="/article/:id" render={(props)=> (
                        <ArticleDetail {...props} user={this.props.user} />)} />
                    
                    <Route exact path="/saved" render={() => (
                        <SavedArticles user={this.props.user}/> )} />
                </Switch>
            </main>
        )
    }
}