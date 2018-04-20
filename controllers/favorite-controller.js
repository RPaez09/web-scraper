const mongoose  = require('mongoose');
const favorite  = require('../models/favorite-model');
const article   = require('../models/article-model');
const userModel = require('../models/user-model');
const jwt       = require('jsonwebtoken');
const getToken  = require('../helpers/getToken');

exports.get_user_favorites = ( req, res ) => {
    const token = getToken( req.headers );

    if( token ){

        const user = jwt.verify( token, process.env.JWT_SECRET );

        if( user._id === req.params.userID ){

            userModel.findById( user._id, { favorites: 1 })
                .populate('favorites')
                .then( response => res.send( response.favorites ) )
                .catch( error => console.log( error ) );

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

        const user = jwt.verify( token, process.env.JWT_SECRET );

        if( user._id === req.body.userID ){
            let favorite;

            article.findById( req.body.articleID )
                .then( newFavorite => {
                    favorite = newFavorite;
                    return  userModel.findByIdAndUpdate( user._id, { $push: { favorites: newFavorite } } )
                })
                .then( response => res.send( favorite ) )
                .catch( error => console.log( error ) );

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