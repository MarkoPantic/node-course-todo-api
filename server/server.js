var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true })
    .then(() => {
        console.log(`Succsesfull`);
    }, e => {
        console.log(e);
    });

// var Todo = mongoose.model('Todo', {
//     text: {
//         type: String,
//         required: true,
//         minlenght: 1,
//         trim: true,

//     },
//     completed: {
//         type: Boolean,
//         default: false

//     },
//     completedAt: {
//         type: Number,
//         default: null
//     }
// });



var User = mongoose.model('User', {
    email: {
        required: true,
        trim: true,
        type: String,
        minlenght: 1
    }
})

// var newTodo = new Todo({
//     text: 'Cook diner'
// })

// newTodo.save()
//     .then((res) => {
//         console.log(`Saved todo: ${res}`);
//     }, (e) => {
//         console.log(e);
//     })


// var secondTodo = new Todo({
//     text: 1234
// })

// secondTodo.save()
//     .then((res) => {
//         console.log(`New todo saved: ${res}`);
//     })
//     .catch((err) => {
//         console.log(`An error occured: ${err}`);
//     })





var user1 = new User({
    email: 'marko@gmail.com'
})


user1.save()
    .then((res) => {
        console.log(`User added: ${res}`);
    })
    .then(() => mongoose.connection.close())
    .catch(e => console.log(e));
    
