const express = require('express');
const generator = require('generate-password');
const passwordHash = require('password-hash');
const User = require('../models').User;
const router = express.Router();
const key = process.env.PORT || 'secret';

router.get('/', (req, res) => {
    User.find()
        .then((userList) => {
            res.json(userList);
        })
        .catch((error) => {
            res.json({ok: false, error: error})
        })
});

router.post('/', (req, res) => {
    const {username, email, password} = req.query;

    // User.findOne({email: email})
    //     .then((user) => {
    //         if (user) {
    //             const msg = `User with email "${ email }" is already registred. Did you forgot your password.`;
    //             logger.warn(msg);
    //             return res.status(400).json({msg: msg})
    //         }
    //     });

    // bcrypt.genSalt(10, (err, salt) => {
    //     console.log(salt)
    //     bcrypt.hash(newUser.password, salt, (err, hash) => {
    //         if (err) throw err;
    //         newUser.password = hash;
    //         newUser.save().then(user => {
    //             return res.status(201).json({
    //                 success: true,
    //                 msg: "Hurry! User is now registered."
    //             });
    //         });
    //     });
    // });

    res.json({ok: true})

    // User.create(req.query)
    //     .then((user) => {
    //         res.json(user);
    //     })
    //     .catch((error) => {
    //         logger.warn(error.message);
    //
    //         res.json({ok: false, error: error})
    //     });
});

/**
 * @route POST api/users/registration
 * @desc Register the User
 * @access Public
 */
router.post('/registration', (req, res) => {
    let {
        username,
        email,
        status = 1,
        password = generator.generate(),
        hashPassword = passwordHash.generate(password)
    } = req.query;

    if (!username) res.status(400).json({msg: 'User Name is Required.'});

    // User.findOne({username: username})
    //     .then((data) => {
    //         if (data) res.status(400).json({msg: 'Username is already taken.'})
    //     });
    //
    // User.findOne({email: email})
    //     .then((data) => {
    //         if (data) res.status(400).json({msg: 'Email is already registered. Did you forgot your password.'})
    //     });

    User.create({username, email, status, password: hashPassword})
        .then((user) => {
            res.status(201).json({msg: `User ${ user.username } registered as a status [${ user.status }].`})
        })
        .catch((error) => {
            res.status(400).json({msg: error})
        })
});

module.exports = router;