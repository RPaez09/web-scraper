import React from 'react';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';

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
        <Card key={comment._id}> 
            <CardHeader title={comment.username}/>
            <CardText>{comment.text}</CardText>
        </Card>) )
    }
}

export default CommentList;