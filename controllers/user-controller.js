const jwt       = require('jsonwebtoken');
const User      = require('../models/user-model');
const mongoos   = require('mongoose');

const getToken = headers => {
    if( headers && headers.authorization ){
        const parted = headers.authorization.split(' ');
        if( parted.length === 2 ) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

exports.create_a_user = function( req, res ) {
    if( !req.body.username || !req.body.password ){
        res.json( { success: false, msg: 'Please supply a username and password' } );
    } else {
        const newUser = new User({
            username: req.body.username.toLowerCase(),
            password: req.body.password,
            email: req.body.email
        });

        newUser.save( function( err ){
            if( err ){
                console.log( err );
                return res.json( { success: false, msg: 'Username or Email in use' } )
            }
            res.json( { success: true, msg: 'New user created successfully' } );
        });
    }
};

exports.sign_in = function( req, res ) {
    User.findOne( { username : req.body.username.toLowerCase() } )
        .then( function(user) {
            if( !user ){
                res.status(200).send( { success: false, msg: 'Authentication failed. Invalid Username of Password.'} );
            } else {
                user.comparePassword( req.body.password, function( err, isMatch ) {
                    if( isMatch && !err ){
                        const token = jwt.sign( user.toJSON(), process.env.JWT_SECRET );

                        User.findOne({ username: req.body.username.toLowerCase() })
                            .then( function( user ) {
                                res.json({
                                    success: true,
                                    token: `JWT ${token}`,
                                    user: {
                                        username: user.username,
                                        email: user.email,
                                        id: user._id
                                    }
                                });
                            })
                            .catch( ( error ) => res.send( error ) );
                    } else {
                        res.status(200).send( { success: false, msg: 'Authentication failed. Invalid Username or Password.' });
                    }
                })
            }
        })
        .catch( error => { throw error });
};