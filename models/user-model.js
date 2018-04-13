const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: 'A username is required',
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: 'An email is required.',
        unique: true
    },
    password: {
        type: String,
        required: 'A password is required'
    }
});

userSchema.pre( 'save',function( next ) {
    let user = this;

    if( this.isModified('password') || this.isNew ){
        bcrypt.genSalt( 10 , ( err, salt ) => {
            if( err ){
                return next( err );
            }
            bcrypt.hash( user.password, salt, null , ( err, hash ) => {
                if( err ){
                    return next( err );
                }
                user.password = hash;
                next();
            })
        });
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function( passw, cb ) {
    bcrypt.compare( passw, this.password, function( err, isMatch ) {
        if( err ){
            return cb( err );
        }
        cb( null, isMatch );
    });
};

module.exports = mongoose.model( 'User', userSchema );