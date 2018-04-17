const express       = require('express');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');
const mongoose      = require('mongoose');
const routes        = require('./routes/routes');
const passport      = require('passport');

require('dotenv').config()

const app           = express();

const port          = process.env.PORT || 8080;

const hackerFetch   = require('./helpers/hackerFetch');

//DB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECTION_STRING);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL );
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });
app.use(passport.initialize());

routes(app);

app.listen( port, ( err ) => {
    if(err){
        throw err
    }

    console.log('Webscraper listening on port: ' + port);
});

hackerFetch.fetchArticles();

setInterval( () => {
    hackerFetch.fetchArticles()
} , 120000); // fetch articles once a minute