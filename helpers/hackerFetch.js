const https     = require('https');
const cheerio   = require('cheerio');

const url = 'https://news.ycombinator.com/';

// fetch the html
const getHtml = new Promise( ( resolve, reject ) => {

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

const scrapeArticles = new Promise( ( resolve, reject ) => {
    // parse the html with cheerio
    getHtml.then( html => {
        const $ = cheerio.load( html );

        const results = $(".athing");

        const resultsArray = [];

        for (let property in results) {
            if (results.hasOwnProperty(property) && parseInt(property) ) {
                resultsArray.push( results[property] );
            }
        }

        const cleanResults = resultsArray.map( result => {
            return {
                id: result.attribs.id,
                title: result.children[4].children[0].children[0].data,
                link: result.children[4].children[0].attribs.href,
                context: `"${url}item?id=${result.attribs.id}"`
            }
        } );

        resolve(cleanResults);

    }).catch( error => { reject(error) } );

});

module.exports = {
    fetchArticles : scrapeArticles
};