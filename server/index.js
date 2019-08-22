require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const Logger = require('./helpers/logger');
const path = require('path');
const PORT = process.env.PORT || 5000;
const PATH = path.join(__dirname, '../dist/');
const app = express();

const logger = new Logger();

app.use(require('./helpers/debugger'))
    .use(bodyParser.json())
    // .use(bodyParser.urlencoded({extended: false}))
    .use(session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 24 * 60 * 60 * 1000 }
    }))
    .use('/api', require('./controllers'))



(async function start() {
    try {
        await require('./database')(process.env.MONGODB_URI)
            .then((msg) => { logger.log(msg) });
        app.listen(PORT, () => {
            logger.log(`Running server at port ${PORT}!`);
            app.get('*', (req, res) => res.sendFile(PATH + 'index.html'));
        });

    } catch (error) {
        logger.error(error);
    }
})();