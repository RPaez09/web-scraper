const articles  = require('../controllers/article-controller');
const users     = require('../controllers/user-controller');
const comments  = require('../controllers/comment-controller');

module.exports = ( app ) => {
    app.route('/api/articles')
        .get( articles.list_all_articles );

    app.route('/api/articles/:id')
        .get( articles.get_an_article );

    app.route('/api/user/signup')
        .post( users.create_a_user );

    app.route('/api/user/signin')
        .post( users.sign_in );

    app.route('/api/comments/')
        .post( comments.create_a_comment );

    app.route('/api/comments/:articleId')
        .get( comments.get_comments_by_article );
};