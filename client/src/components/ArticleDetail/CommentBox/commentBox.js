import React, { Component } from 'react';

import { Card, CardHeader } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    outerBox : {
        padding: '0 20px 20px 20px'
    },
    commentBox : {
        width: '100%'
    }
}

export default class CommentBox extends Component {

    constructor(props){
        super(props);

        this.state = {
            isValid : false,
            errorMsg : '',
            length : '',
            value : ''
        }
    };

    onChange = (e) => {
        this.setState({
            value: e.target.value
        });
    }

    render(){
        return (!this.props.user.isLoggedIn)
        ? <Card><CardHeader title="You must be logged in to leave a comment"/></Card>
        : <Card style={style.outerBox}>
            <TextField
                floatingLabelText={`${this.props.user.username}:`}
                multiLine={true}
                rows={1}
                rowsMax={6}
                style={style.commentBox}
                value={this.state.value}
                onChange={this.onChange} /><br />
            <RaisedButton 
                label="Submit Comment"
                disabled={true}
                primary={true} 
                fullWidth={true} />
          </Card> 
    }
    
};