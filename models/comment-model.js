const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    articleId: {
        type: String,
        required: 'A target Article ID is required.'
    },
    username: {
        type: String,
        required: 'A username is required.'
    },
    userID: {
        type: String,
        required: 'A userId is required.'
    },
    text: {
        type: String,
        required: 'A comment is required.'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', commentSchema);