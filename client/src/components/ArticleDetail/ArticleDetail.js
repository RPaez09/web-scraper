import React, { Component } from 'react';

import Paper from 'material-ui/Paper';

import Title from './title';
import CommentList from './commentList';
import CommentBox from './CommentBox/commentBox';
import ConfirmDelete from './ConfirmDelete/confirmDelete';

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
                comments: []
            },
            confirmDelete: {
                open: false,
                id: ''
            }
        }
    };

    componentDidMount(){
        API.get(`/api/articles/${this.props.match.params.id}`) //Get main article details
            .then( response => {
                if( response.data === "" ){
                    console.log('Error, article not found')
                } else {
                    this.setState(
                        { title: 
                            { ...this.state.title, 
                                isLoading: false,
                                article: response.data  
                            }
                        });
                }
            })
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
    };

    onSubmitComment = ( commentText ) => {
        let newComment = {
            articleId : this.props.match.params.id,
            username : this.props.user.username,
            userID : this.props.user.id,
            text : commentText
        };

        let options = {
            headers : { authorization : this.props.user.token }
        };

        API.post('/api/comments', newComment, options )
            .then( response => {
                if( response.status === 200 ){
                    this.setState(
                        { commentList: {
                            ...this.state.commentList,
                            comments: this.state.commentList.comments.concat( response.data )
                        }
                        });
                    this.props.onSnackbarMessage("You comment has been submitted");
                }
            })
            .catch( error => console.log(`Error : ${error}`) );
    };

    onDeleteComment = ( ) => {
        let options = {
            headers : { authorization : this.props.user.token }
        };

        API.delete(`/api/comments/delete/${this.state.confirmDelete.id}`, options)
            .then( response => {
                if( response.data.success ){
                    this.setState({
                        commentList: 
                            { ...this.state.commentList, 
                                comments: this.state.commentList.comments.filter( comment => comment._id !== response.data.comment._id ) 
                            },
                        confirmDelete:
                            {
                                open: false,
                                id: ''
                            }
                    });
                    this.props.onSnackbarMessage("Your comment has been successfully deleted");
                } else {
                    this.props.onSnackbarMessage( response.msg );
                }
            })
            .catch( error => {
                console.log(error);
                this.props.onSnackbarMessage("There was an error deleting your comment");
            });
    };

    onOpenConfirmDelete = (id) => {
        this.setState({ confirmDelete: { ...this.state.confirmDelete, open: true, id: id } });
    };

    onCloseConfirmDelete = () => {
        this.setState({ confirmDelete: { ...this.state.confirmDelete, open: false, id: '' } });
    };

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
                        user={this.props.user}
                        isLoading={this.state.commentList.isLoading}
                        comments={this.state.commentList.comments}
                        openConfirmDelete={this.onOpenConfirmDelete}/>
                </Paper>
                <Paper style={style} zDepth={0}>
                    <CommentBox 
                        user={this.props.user}
                        onSubmit={this.onSubmitComment}
                        disabled={this.state.title.isLoading} />
                </Paper>
                <ConfirmDelete 
                    open={this.state.confirmDelete.open}
                    handleClose={this.onCloseConfirmDelete}
                    handleDelete={this.onDeleteComment}/>
            </React.Fragment>
        )
    };
};