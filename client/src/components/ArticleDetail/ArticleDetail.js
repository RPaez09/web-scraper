import React, { Component } from 'react';

import Title from './title';
import Paper from 'material-ui/Paper';

import API from '../../api';

const style = {
    width: "80vw",
    margin: 20,
    display: 'inline-block'
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
        API.get(`/api/articles/${this.props.match.params.id}`)
            .then( response => this.setState(
                { title: 
                    { ...this.state.title, 
                        isLoading: false,
                        article: response.data  
                    } 
                }) )
            .catch( error => console.log( error ) )
        //fetch article comments.
    }

    render(){
        return (
            <Paper style={style}>
                <Title 
                    isLoading={this.state.title.isLoading} 
                    article={this.state.title.article} />
            </Paper>
        )
    }
}