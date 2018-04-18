import React, { Component } from 'react';
import { Redirect } from 'react-router';

import ArticleList from '../Home/articleList';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';

import API from '../../api';

const style = {
    width: "80vw",
    margin: 20,
    padding: 20,
    display: 'inline-block'
};

export default class SavedArticles extends Component {

    constructor(props){
        super(props)

        this.state = {
            articles: [],
            isLoading: true
        }
    };

    componentDidMount(){
        if( this.props.user.isLoggedIn ){
            let options = { headers: { authorization: this.props.user.token } };
            API.get(`/api/favorites/${this.props.user.id}`, options)
                .then( response => {
                    if(response.status === 200){
                        this.setState({
                            articles: response.data,
                            isLoading: false
                        });
                    }
                })
                .catch( error => console.log(error) );
        }
    };

    render(){
        return (
        <React.Fragment>
            { !this.props.user.isLoggedIn && <Redirect to="/" push /> }
            { (this.state.isLoading) ? <CircularProgress size={80} thickness={5} /> : 
             this.state.articles.length === 0  ? <Paper style={style}>No saved articles</Paper> : <ArticleList articles={this.state.articles} user={this.props.user}/>}
        </React.Fragment>)
    }
}