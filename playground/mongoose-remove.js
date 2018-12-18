const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

// Todo.remove({})
//     .then(res => {
//         console.log(res);
//     });



// Todo.findByIdAndRemove('5c18f8a94489d31907cd711b')
//     .then((result) => {
//         console.log(result);
//     }).catch((err) => {
        
//     });

Todo.findOneAndDelete({
    text: 'Something to do'
})
    .then(res => {
        console.log(res);
    })