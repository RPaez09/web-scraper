# web-scraper

A full stack web app that periodically fetches articles from [Hacker News](https://news.ycombinator.com/). Users can sign up and comment on articles as well as save articles for reading later.

## live link
[visit live link](http://focused-pasteur-ad68b0.netlify.com/)

# front end

The client `/client` is built using react and material-ui. Redux was considered but deemed unessesary for this project.

`npm start` to get things started when you're in the `/client` directory.

## setup

In the `/client/src` directory, make a file called `config.js`. Here's an example for local testing.

```javascript
const config = {
    url: 'http://localhost:8080'
}

export default config;
```

# backend

For the server, Node + Express. Mongoose is used for ORM. Passport + JWT for auth.

## setup

There are three environment variables that need to be setup.
1.  `DB_CONNECTION_STRING`
    A connection string to your mongo db
2.  `JWT_SECRET`
    The secret used to hash passwords using passport
3.  `CLIENT_URL`
    The URL to be accepted for CORS (Points to your client)

# Note
PRs are not being accepted. Feel free to email me at `richardp809@gmail.com` with any questions or suggestions. Thank you!