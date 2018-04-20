const mongoose  = require('mongoose');
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

        const user = jwt.verify( token, process.env.JWT_SECRET );

        if( user._id === req.body.userID ){
            let oldFavorite;

            article.findById( req.body.articleID )
                .then( target => {
                    oldFavorite = target;
                    return userModel.findByIdAndUpdate( user._id, { $pull: { favorites: target._id  } } )
                })
                .then( response => res.send( oldFavorite ) )
                .catch( error => console.log(error) );

        } else {
            res.status(403).send( { success: false, msg: 'Unauthorized' } );
        }

    } else {
        res.status(403).send( { success: false, msg: 'Unauthorized' } );
    }

};