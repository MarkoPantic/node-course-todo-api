var mongoose = require('mongoose');

var dbURL = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(dbURL, { useNewUrlParser: true })
    .then(() => {
        console.log(`Database connected succsesfully`);
    }, e => {
        console.log(e);
    });


module.exports = {
    mongoose
}