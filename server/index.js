require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const logger = new (require('./helpers/logger'))();
const controllers = require('./controllers');

const PORT = process.env.PORT || 5000;
const PATH = path.join(__dirname,'../dist/');
const app = express();

app.use(require('./helpers/timelines'))
    .use(require('./helpers/errors'))
    .use(express.urlencoded({extended: true}))
    .use('/api', controllers);

mongoose.connection.on('connected', () => {
    logger.info('Succesfully connected to MongoDB Database')
});

mongoose.connection.on('error', (err) => {
    logger.error("Database Connection Error: " + err);
    process.exit(2);
});

(async function start() {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false
        });

        app.listen(PORT, () => {
            app.get(/.*/, (req, res) => res.sendFile(PATH + 'index.html'));
            logger.info(`Running server at port ${PORT}!`);
        });

    } catch (error) {
        logger.error(error);
    }
})();



