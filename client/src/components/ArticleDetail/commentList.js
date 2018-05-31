import React from 'react';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';

const CommentList = (props) => {
    if( props.isLoading ){
        return (
        <Card>
            <CircularProgress 
                size={80} 
                thickness={5} />
        </Card>)
    } else if( props.comments.length === 0 ){
        return (
            <Card><CardHeader title="Sorry, there are no comments here yet..."/></Card>
        )
    } else {
        return props.comments.map( comment => (
        <Card key={comment._id} className="comment-box"> 
            <CardHeader title={comment.username}/>
            <CardText>{comment.text}</CardText>
            { props.user.isLoggedIn && props.user.id === comment.userID &&
                <div className="comment-controls">
                    <IconButton tooltip="Delete" onClick={() => props.openConfirmDelete(comment._id)}>
                        <ActionDelete />
                    </IconButton>
                </div>
            }
        </Card>) )
    }
}

export default CommentList;