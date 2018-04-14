const mongoose = require('mongoose');
const comment = require('../models/comment-model');

exports.get_comments_by_article = ( req, res ) => {
    comment.find({ articleId: req.params.articleId })
        .sort({_id: 1})
        .then( comments => {
            res.send( comments );
        })
        .catch( error => console.log( `Error: ${error}` ) );
};

exports.create_a_comment = ( req, res ) => {
    comment.create( req.body )
        .then( comment => res.send(comment) )
        .catch( error => console.log( `Error: ${error}` ) );
};