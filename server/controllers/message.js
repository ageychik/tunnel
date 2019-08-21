const express = require('express');
const router = express.Router();
// const models = require('../models');

router.get('/', (req, res) => {
    req.send('get messages');
});

module.exports = router;