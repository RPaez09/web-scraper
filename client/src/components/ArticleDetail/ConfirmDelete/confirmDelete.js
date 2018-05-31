import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class ConfirmDelete extends Component {
    render = () => {
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.props.handleClose}
            />,
            <FlatButton
              label="Delete"
              primary={true}
              onClick={this.props.handleDelete}
            />
        ];

        return <Dialog
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.handleClose} >
                    Delete this comment?
                </Dialog>
    }
};