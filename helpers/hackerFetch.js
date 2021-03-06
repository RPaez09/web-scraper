const https         = require('https');
const cheerio       = require('cheerio');
const mongoose      = require('mongoose');
const article       = require('../models/article-model');

const parseDomain   = require('./parseDomain');

const url = 'https://news.ycombinator.com/';

// fetch the html
const getHtml = () => {
    return new Promise( ( resolve, reject ) => {

        https.get(url, response => {
            response.setEncoding("utf8");
            let body = "";
            response.on("data", data => {
                body += data;
            });
            response.on("end", () => {
                resolve( body );
            });
        }).on('error', (e) => {
            reject( e );
        });
    
    });
}

const scrapeArticles = () => {
    return new Promise( ( resolve, reject ) => {
        // parse the html with cheerio
        getHtml().then( html => {
            const $ = cheerio.load( html );

            const results = $(".athing");

            const resultsArray = [];

            for (let property in results) {
                if (results.hasOwnProperty(property) && parseInt(property) ) {
                    resultsArray.push( results[property] );
                }
            }

            const cleanResults = resultsArray.map( result => {
                let link = result.children[4].children[0].attribs.href;
                let context = `${url}item?id=${result.attribs.id}`;
                let isInternal = false;
                let domain;

                if( link.startsWith("item?id=") ){ //if it's an internal hackernews link
                    link = context; 
                    isInternal = true;
                    domain = parseDomain(url);
                }else{
                    domain = parseDomain(link);
                }

                return {
                    id: result.attribs.id,
                    title: result.children[4].children[0].children[0].data,
                    link: link,
                    context: context,
                    isInternal: isInternal,
                    domain: domain
                }
            } );

            resolve(cleanResults);

        }).catch( error => { reject(error) } );

    });
}

const fetchArticles = () => {
    return new Promise( ( resolve, reject ) => {
        scrapeArticles().then( articles => {
            for( let i = 0; i < articles.length; i++ ){
                article.findOne({ id: articles[i].id })
                    .then( result => {
                        if( !result ){
                            article.create( articles[i] )
                                .then( ( article ) => {
                                    console.log(`Article Created: ${article.id} | "${article.title}"`);
                                })
                                .catch( error => console.log(`Articlefetch Error: ${error}`) );
                        }
                    })
                    .catch( error => console.log(`Error: ${error}`) )
            }
        }).catch( error => reject( error ) );
    });
}

module.exports = {
    fetchArticles : fetchArticles
};