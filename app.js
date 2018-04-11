const express       = require('express');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');
const mongoose      = require('mongoose');

const config        = require('./config/config');

const app           = express();

const port          = process.env.port || 8080;

const hackerFetch   = require('./helpers/hackerFetch');

//DB
mongoose.Promise = global.Promise;
mongoose.connect(config.db);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen( port, ( err ) => {
    if(err){
        throw err
    }

    console.log('Webscraper listening on port: ' + port);
});

hackerFetch.fetchArticles();

setInterval( () => {
    console.log('fetching new articles...');
    hackerFetch.fetchArticles()
} , 120000); // fetch articles once a minute