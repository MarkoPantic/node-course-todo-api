var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const { ObjectID } = require('mongodb');

var app = express();
var port = process.env.Port || 3000


app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    })

    todo.save()
        .then((doc) => {
            res.send(doc)
        })
        .catch((e) => {
            res.status(400).send(e)
        })
})

app.get('/todos', (req, res) => {
    Todo.find()
        .then((todos) => {
            res.send({
                todos
            })
        })
        .catch(e => res.status(400).send(e))
})


app.get('/todos/:id', (req, res) => {

    var id = req.params.id

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
        return console.log(`${id} not a valid id`);
    }

    Todo.findById(id)
        .then(todo => {

            if (!todo) {
                res.status(404).send()
                return console.log(`${id} not found in database`);
            }

            console.log(`${todo.text} has been requested from database`);
            res.status(200).send({todo})
            

        })
        .catch(e => {
            res.status(400).send();
            console.log(`An error has occued`, e);
        })


})



// app.post('/user', (req, res) => {
//     var user = new User({
//         email: req.body.email
//     })

//     user.save()
//         .then((r) => {
//             res.send(r)
//         })
//         .catch((e) => {
//             console.log(`An error has occured ${e}`);
//             res.send(e)
//         })
// })


app.listen(port, () => {
    console.log(`Started on port ${port}`);
})

module.exports = {
    app
}

