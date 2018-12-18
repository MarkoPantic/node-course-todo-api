const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

// var id = '5c18e02250de0b3248803c14';

// if (!ObjectID.isValid(id)) {
//     console.log(`ID not valid`);
// }

// Todo.find({
//     _id: id
// })
//     .then((res) => {
//         console.log(`find`, res);
//     })
//     .catch(e => console.log(e))


// Todo.findOne({
//     _id: id
// })
//     .then((res) => {
//         console.log(`findOne`, res);
//     })
//     .catch(e => console.log(e))

// Todo.findById(id)
//     .then((res) => {
//         if (!res) {
//             return console.log(`ID not found`);
//         }
//         console.log(`findById`, res);
//     })
//     .catch(e => console.log(e))

const usrID = '5c0d105955898838d4d7f0f1'

User.findById(usrID)
    .then(res => {
        if (!res) {
            return console.log('ID not found');
        }

        console.log(`You requested an email from ${res._id} and it is ${res.email}`);
    })
    .catch(e => console.log('An error occured'))
