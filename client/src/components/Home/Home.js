import React, { Component } from 'react';

import SearchBox from './searchBox';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import ArticleList from './articleList';

import API from '../../api';

export default class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            articles: [],
            isLoading: true,
            snackbar: {
                open: false,
                message: ''
            },
            search: ''
        };
    };

    componentDidMount(){
        API.get('/api/articles')
            .then( articles => this.setState({ articles: articles.data, isLoading: false }) )
            .catch( error => console.log(error) )
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
                    this.setState({
                        snackbar : {
                            ...this.state.snackbar,
                            open: true,
                            message: 'Article saved to favorites.'
                        }
                    });
                })
                .catch( error => {
                    console.log(error);
                });
        } else {
            this.setState({
                snackbar : {
                    ...this.state.snackbar,
                    open: true,
                    message: 'You must be logged in to save an article'
                }
            });
        }
    };

    handleSnackbarClose = () => {
        this.setState({
            snackbar : {
                ...this.state.snackbar,
                open: false,
                message: ''
            }
        });
    };

    handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.search);
    }

    handleSearchChange = (e) => {
        this.setState({
            search: e.target.value
        });
    }

    render(){
        return (
            <React.Fragment>
                {(this.state.isLoading) ? <CircularProgress size={80} thickness={5} /> : 
                <React.Fragment>
                    <SearchBox 
                        onSubmit={this.handleSearchSubmit}
                        onSearchChange={this.handleSearchChange}
                        text={this.state.search}/>
                    <ArticleList articles={this.state.articles} user={this.props.user} handleSave={this.handleSave}></ArticleList>
                </React.Fragment> }
                <Snackbar 
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                    autoHideDuration={1500}
                    onRequestClose={this.handleSnackbarClose}/>
            </React.Fragment>)
    }
}