const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    userID : {
        type: String,
        required: 'A userId is required.'
    },
    articleID : {
        type: String,
        required: 'An articleID is required.'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Favorite', favoriteSchema);