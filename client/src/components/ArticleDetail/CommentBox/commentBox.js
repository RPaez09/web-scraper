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
            length : 0,
            value : ''
        }
    };

    onChange = (e) => {
        if( e.target.value.length === 0 ){
            this.setState({
                value : e.target.value,
                errorMsg : '',
                isValid : false,
                length : e.target.value.length
            });
        } else if ( e.target.value.length <= 700 ) {
            this.setState({
                value: e.target.value,
                errorMsg : '',
                isValid : true,
                length : e.target.value.length
            });
        } else {
            this.setState({
                value : e.target.value,
                errorMsg : 'Your comment is too long.',
                isValid : false,
                length : e.target.value.length
            });
        }
    }

    onSubmit = () => {
        if( this.state.isValid ){ this.props.onSubmit(this.state.value); }
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
                errorText={this.state.errorMsg}
                onChange={this.onChange} /><br />
            <RaisedButton 
                label="Submit Comment"
                onClick={this.onSubmit}
                disabled={!this.state.isValid}
                primary={true} 
                fullWidth={true} />
          </Card> 
    }
    
};