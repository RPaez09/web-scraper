import React, { Component } from 'react';

import SearchBox from './searchBox';
import CircularProgress from 'material-ui/CircularProgress';
import ArticleList from './articleList';

import API from '../../api';

export default class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            articles: [],
            isLoading: true,
            search: '',
            disabled: false,
            searchStatus: false
        };
    };

    componentDidMount(){
        this.getAllArticles();
    };

    handleSave = ( articleId ) => {
        if( this.props.user.isLoggedIn ){
            let options = { headers: { authorization: this.props.user.token } }
            let body = {
                userID: this.props.user.id,
                articleID: articleId,
            }
            API.post('/api/favorites/add', body, options )
                .then( response => {
                    this.props.handleSave( response.data._id );
                    this.props.onSnackbarMessage('Article saved to favorites.');
                })
                .catch( error => {
                    console.log(error);
                });
        } else {
            this.props.onSnackbarMessage('You must be logged in to save an article');
        }
    };

    handleSearchSubmit = (e) => {
        e.preventDefault();

        this.setState()

        if( this.state.search !== "" ){
            API.get('/api/articles/search/' + this.state.search)
                .then( response => {
                    if( response.status === 200 ){
                        this.setState({
                            articles: response.data
                        });
                    }
                })
                .catch( error => { this.props.onSnackbarMessage(error) });
            this.setState({
                search: "",
                disabled: false,
                searchStatus: true
            });
        }
    };

    handleSearchClear = () => {
        this.getAllArticles();
    };

    handleSearchChange = (e) => {
        this.setState({
            search: e.target.value
        });
    };

    getAllArticles = () => {
        API.get('/api/articles')
        .then( articles => this.setState({ articles: articles.data, isLoading: false, searchStatus: false }) )
        .catch( error => console.log(error) )
    }

    render(){
        return (
            <React.Fragment>
                {(this.state.isLoading) ? <CircularProgress size={80} thickness={5} /> : 
                <React.Fragment>
                    <SearchBox 
                        onSubmit={this.handleSearchSubmit}
                        onSearchChange={this.handleSearchChange}
                        onSearchClear={this.handleSearchClear}
                        text={this.state.search}
                        disabled={this.state.disabled}
                        searchActive={this.state.searchStatus}/>
                    <ArticleList articles={this.state.articles} user={this.props.user} handleSave={this.handleSave}></ArticleList>
                </React.Fragment> }
            </React.Fragment>)
    }
}