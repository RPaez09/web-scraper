import React, { Component } from 'react';

import Title from './title';
import Paper from 'material-ui/Paper';

const style = {
    width: "80vw",
    margin: 20,
    display: 'inline-block'
};

export default class ArticleDetail extends Component {

    constructor(props){
        super(props);

        console.log(props.match.params.id);

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
        //fetch article info.
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