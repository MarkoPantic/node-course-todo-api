var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true })
    .then(() => {
        console.log(`Succsesfull`);
    }, e => {
        console.log(e);
    });


module.exports = {
    mongoose
}