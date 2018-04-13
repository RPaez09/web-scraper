const articles = require('../controllers/article-controller');
const users = require('../controllers/user-controller');

module.exports = ( app ) => {
    app.route('/api/articles')
        .get( articles.list_all_articles );

    app.route('/api/user/signup')
        .post( users.create_a_user );

    app.route('/api/user/signin')
        .post( users.sign_in );
};