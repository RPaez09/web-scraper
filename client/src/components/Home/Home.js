import React, { Component } from 'react';

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
            }
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
            API.post('/api/favorites/new', body, options )
                .then( response => {
                    
                    this.props.handleSave( response.data.articleID );
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

    render(){
        return (
            <React.Fragment>
                {(this.state.isLoading) ? <CircularProgress size={80} thickness={5} /> : <ArticleList articles={this.state.articles} user={this.props.user} handleSave={this.handleSave}></ArticleList>}
                <Snackbar 
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                    autoHideDuration={1500}
                    onRequestClose={this.handleSnackbarClose}/>
            </React.Fragment>)
    }
}