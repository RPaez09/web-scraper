const express       = require('express');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');
const mongoose      = require('mongoose');
const routes        = require('./routes/routes');

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
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", config.url + ':3000' );
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

routes(app);

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