import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    width: "80vw",
    margin: 20,
    display: 'inline-block',
    padding: '0 20px 15px 20px'
};

const secondButtonStyle = {
    marginTop: "10px"
}

export default class SearchBox extends Component{
    render(){
        return (
            <Paper style={style}>
                <form
                    onSubmit={this.props.onSubmit}>
                    <TextField 
                        floatingLabelText="Search Articles"
                        fullWidth={true}
                        onChange={this.props.onSearchChange}
                        value={this.props.text} />
                    <RaisedButton 
                        label="Search"
                        type="submit"
                        primary={true}
                        disabled={this.props.disabled}
                        fullWidth={true} />
                    {this.props.searchActive && 
                    <RaisedButton 
                        label="Clear Results"
                        style={secondButtonStyle}
                        secondary={true}
                        fullWidth={true}
                        onClick={this.props.onSearchClear}/>}
                </form>
            </Paper>
        )
    }
};