var mongoose = require('mongoose');

var dbURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp';

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