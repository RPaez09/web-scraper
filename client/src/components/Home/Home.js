import React, { Component } from 'react';

import ArticleList from './articleList';

import API from '../../api';

export default class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            articles: []
        };
    }

    componentDidMount(){
        API.get('/api/articles')
            .then( articles => this.setState({ articles: articles.data }) )
            .catch( error => console.log(error) )
    }

    render(){
        return (<ArticleList articles={this.state.articles}></ArticleList>)
    }
}