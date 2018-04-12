const parseDomain = ( url ) => {
    url = url.split('//')[1];
    url = url.split('/')[0];
    return url
};

module.exports = parseDomain;