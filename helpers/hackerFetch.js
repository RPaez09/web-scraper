const https = require('https');

const url = 'https://news.ycombinator.com/';

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

module.exports = {
    getHtml : getHtml
}