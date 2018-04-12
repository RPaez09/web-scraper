const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    id: {
        type: Number,
        required: 'An ID is required.',
        unique: true
    },
    title: {
        type: String,
        required: 'A title is required.'
    },
    link: {
        type: String,
        required: 'A link is required.'
    },
    context: {
        type: String,
        required: 'The context link is required'
    },
    domain: {
        type: String
    },
    isInternal: {
        type: Boolean,
        default: false
    },
    Date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Article', articleSchema);