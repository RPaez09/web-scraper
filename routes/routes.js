const articles = require('../controllers/article-controller');

module.exports = ( app ) => {
    app.route('/api/articles')
        .get( articles.list_all_articles );
}