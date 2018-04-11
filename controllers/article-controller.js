const mongoose = require('mongoose');
const article = mongoose.model('Article');

exports.list_all_articles = ( req, res ) => {
    article.find({})
        .then( ( err, articles ) => {
            if( err ){
                res.send( err );
            } else{
                res.send( articles );
            }
        })
        .catch( error => console.log( `Error: ${error}` ) );
}

exports.get_an_article = ( req, res ) => {
    article.findOne( { id: req.params.id } )
        .then( ( err, article ) =>{
            if( err ){
                res.send( err );
            } else{
                res.send( article );
            }
        })
        .catch( error => console.log( `Error: ${error}` ) );
}