const articles  = require('../controllers/article-controller');
const users     = require('../controllers/user-controller');
const comments  = require('../controllers/comment-controller');
const favorites = require('../controllers/favorite-controller');

module.exports = ( app ) => {
    app.route('/api/articles')
        .get( articles.list_all_articles );

    app.route('/api/articles/:id')
        .get( articles.get_an_article );

    app.route('/api/articles/search/:title')
        .get( articles.search_an_article );

    app.route('/api/user/signup')
        .post( users.create_a_user );

    app.route('/api/user/signin')
        .post( users.sign_in );

    app.route('/api/comments/')
        .post( comments.create_a_comment );

    app.route('/api/comments/delete/:id')
        .delete( comments.delete_a_comment );

    app.route('/api/comments/:articleId')
        .get( comments.get_comments_by_article );

    app.route('/api/favorites/:userID')
        .get( favorites.get_user_favorites );

    app.route('/api/favorites/add')
        .post( favorites.add_a_favorite );

    app.route('/api/favorites/remove')
        .delete( favorites.remove_a_favorite );
};