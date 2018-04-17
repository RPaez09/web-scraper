import React, { Component } from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import ArticleList from './articleList';

import API from '../../api';

export default class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            articles: [],
            isLoading: true
        };
    }

    componentDidMount(){
        API.get('/api/articles')
            .then( articles => this.setState({ articles: articles.data, isLoading: false }) )
            .catch( error => console.log(error) )
    }

    render(){
        return ((this.state.isLoading) ? <CircularProgress size={80} thickness={5} /> : <ArticleList articles={this.state.articles}></ArticleList>)
    }
}