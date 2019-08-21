const express = require('express');
const router = express.Router();

const logger = new (require('../helpers/logger'))();
const models = require('../models');

router.get('/', (req, res) => {
    models.User.find()
        .then((userList) => {
            res.json(userList);
        })
        .catch((error) => {
            logger.warn(error.message);

            res.json({ok: false, error: error})
        })
});

router.post('/', (req, res) => {
    models.User.create(req.query)
        .then((user) => {
            res.json(user);
        })
        .catch((error) => {
            logger.warn(error.message);

            res.json({ok: false, error: error})
        });
});

module.exports = router;