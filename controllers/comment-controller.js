const mongoose = require('mongoose');
const comment = require('../models/comment-model');
const jwt = require('jsonwebtoken');
const getToken = require('../helpers/getToken');

exports.get_comments_by_article = ( req, res ) => {
    comment.find({ articleId: req.params.articleId })
        .sort({_id: 1})
        .then( comments => {
            res.send( comments );
        })
        .catch( error => console.log( `Error: ${error}` ) );
};

exports.create_a_comment = ( req, res ) => {
    const token = getToken( req.headers );

    if( token ){

        user = jwt.verify( token, process.env.JWT_SECRET );

        if( user._id === req.body.userID ){
            let newComment = {
                articleId: req.body.articleId,
                username: user.username,
                userID: user._id,
                text: req.body.text
            };

            comment.create( req.body )
                .then( comment => res.send(comment) )
                .catch( error => console.log( `Error: ${error}` ) );

        } else {
            res.status(403).send( { success: false, msg: 'Unauthorized' } );
        }

    } else {
        res.status(403).send( { success: false, msg: 'Unauthorized' } );
    }
};

exports.delete_a_comment = ( req, res ) => {
    const token = getToken( req.headers );

    if( token ){

        user = jwt.verify( token, process.env.JWT_SECRET );

        comment.findById(req.params.id)
            .then( targetComment => {
                if( targetComment ){ // check if the comment exists
                    if( targetComment.userID === user._id ){ // check if the comment belongs to the user
                        comment.findByIdAndRemove(req.params.id)
                            .then( deletedComment => {
                                res.send({comment: deletedComment._doc, success: true, msg: 'Comment succesfully deleted'});
                            })
                            .catch( error => console.log(error) );
                    } else {
                        res.status(403).send( { success: false, msg: 'Unauthorized' } );
                    }
                } else {
                    res.send({ success: false, msg: 'Comment not found' });
                }
            })
            .catch( error => {
                console.log(error);
                res.status(404).send();
            });
    } else {
        res.status(403).send( { success: false, msg: 'Unauthorized' } );
    }
};