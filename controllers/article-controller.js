const mongoose = require('mongoose');
const article = require('../models/article-model');

exports.list_all_articles = ( req, res ) => {
    article.find({})
        .sort({_id: -1})
        .limit(20)
        .then( ( err, articles ) => {
            if( err ){
                res.send( err );
            } else{
                res.send( articles );
            }
        })
        .catch( error => console.log( `Error: ${error}` ) );
}

exports.get_an_article = ( req, res ) => {
    article.findOne( { id: req.params.id } )
        .then( ( err, article ) =>{
            if( err ){
                res.send( err );
            } else{
                res.send( article );
            }
        })
        .catch( error => console.log( `Error: ${error}` ) );
}