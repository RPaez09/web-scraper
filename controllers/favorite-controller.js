const mongoose  = require('mongoose');
const favorite  = require('../models/favorite-model');
const article   = require('../models/article-model');
const jwt       = require('jsonwebtoken');
const getToken  = require('../helpers/getToken');

exports.get_user_favorites = ( req, res ) => {
    const token = getToken( req.headers );

    if( token ){

        user = jwt.verify( token, process.env.JWT_SECRET );

        if( user._id === req.params.userID ){
            favorite.find({ userID: user._id })
                .sort({ date: -1 })
                .then( favorites => {
                    let articleCue = [];
                    let foundArticles = [];

                    for( let i = 0; i < favorites.length; i++){
                        articleCue.push( article.findById( favorites[i].articleID ) );
                    }

                    Promise.all( articleCue )
                        .then( articles =>  res.send( articles ) )
                        .catch( error => console.log(error) );
                        
                    }) .catch( error => console.log( `Error: ${error}` ) );
        } else {
            res.status(403).send( { success: false, msg: 'Unauthorized' } );
        }

    } else {
        res.status(403).send( { success: false, msg: 'Unauthorized' } );
    }
};

exports.add_a_favorite = ( req, res ) => {
    const token = getToken( req.headers );

    if( token ){

        user = jwt.verify( token, process.env.JWT_SECRET );

        if( user._id === req.body.userID ){
            let newFavorite = {
                userID : user._id,
                articleID : req.body.articleID
            }

            favorite.create( newFavorite )
                .then( freshFavorite => res.send( freshFavorite ) )
                .catch( error => console.log( `Error: ${error}` ) );
        } else {
            res.status(403).send( { success: false, msg: 'Unauthorized' } );
        }
    } else {
        res.status(403).send( { success: false, msg: 'Unauthorized' } );
    }

};

exports.remove_a_favorite = ( req, res ) => {
    const token = getToken( req.headers );

    if( token ){ // do they have a token at all

        user = jwt.verify( token, process.env.JWT_SECRET );

        favorite.findById( req.body._id )
            .then( result => {
                if( result.userID === user._id ){ // if this favorite belongs to you

                    favorite.findByIdAndRemove( { _id: req.body._id } )
                        .then( deletedFavorite => res.send( deletedFavorite ) )
                        .catch( error => console.log( `Error: ${error}` ) );
                
                } else {
                    res.status(403).send( { success: false, msg: 'Unauthorized' } ); // how dare you...
                }
            })
            .catch( error => console.log( `Error: ${error}` ) );
    } else {
        res.status(403).send( { success: false, msg: 'Unauthorized' } );
    }

};