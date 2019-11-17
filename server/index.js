require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 5000;
const PATH = path.join(__dirname, '../dist');
const app = express();

app.use(require('./helpers/debugger'));
app.use(express.static(PATH));
app.use(bodyParser.json());
app.use(cors());
app.use(session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 24 * 60 * 60 * 1000 }
    }));
app.use('/api', require('./controllers'));

module.exports = (logger) => {
    (async function start() {
        try {
            await require('./database')(process.env.MONGODB_URI)
                .then((msg) => {
                    logger.add({color: 'cyan', text: `- ${msg}`})
                    app.listen(PORT, () => {
                        logger.add({color: 'cyan', text: `- Running server at port ${PORT}!`});
                        logger.end();

                        app.get('/', (req, res) => res.sendFile(PATH + '/index.html'));
                    });
                });


        } catch (error) {
            logger.error(error);
        }
    })();
};