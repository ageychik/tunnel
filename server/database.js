const mongoose = require('mongoose');

module.exports = (url) => {
    return mongoose.connect(url, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
        .then(() => {return 'Succesfully connected to MongoDB Database'})
        .catch((error) => {return `Database Connection Error: ${error}`});
};