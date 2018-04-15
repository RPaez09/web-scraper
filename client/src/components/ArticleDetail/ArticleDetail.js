import React, { Component } from 'react';

import Paper from 'material-ui/Paper';

import Title from './title';
import CommentList from './commentList';

import API from '../../api';

const style = {
    width: "80vw",
    margin: '0 auto',
    paddingBottom: '30px',
    textAlign: 'left'
};

export default class ArticleDetail extends Component {

    constructor(props){
        super(props);

        this.state = {
            title: {
                isLoading: true,
                article: null
            },
            commentList: {
                isLoading: true,
                comments: null
            }
        }
    }

    componentDidMount(){
        API.get(`/api/articles/${this.props.match.params.id}`) //Get main article details
            .then( response => this.setState(
                { title: 
                    { ...this.state.title, 
                        isLoading: false,
                        article: response.data  
                    } 
                }) )
            .catch( error => console.log( error ) )
       
        API.get(`/api/comments/${this.props.match.params.id}`) //Get comments
            .then( response => this.setState(
                { commentList:
                    { ...this.state.commentList,
                        isLoading: false,
                        comments: response.data
                    }
                }) )
            .catch( error => console.log( error ) )
    }

    render(){
        return (
            <React.Fragment>
                <Paper style={style} zDepth={0}>
                    <Title 
                        isLoading={this.state.title.isLoading} 
                        article={this.state.title.article} />
                </Paper>
                <Paper style={style} zDepth={0}>
                    <CommentList 
                        isLoading={this.state.commentList.isLoading}
                        comments={this.state.commentList.comments}/>
                </Paper>
            </React.Fragment>
        )
    }
}