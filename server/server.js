const express = require('express');
var bodyParser = require('body-parser');
const _ = require('lodash')


require('./config/config')
const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const { ObjectID } = require('mongodb');
const {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT


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


app.delete('/todos/:id', (req, res) => {

    var id = req.params.id

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
        return console.log(`${id} not a valid id`);
    }

    Todo.findByIdAndDelete(id)
        .then(todo => {
            if (!todo) {
                return res.status(404).send()
            }
            res.status(200).send({todo})
        })
        .catch(e => {
            res.status(400).send();
            console.log(e);
        })

})


app.patch(`/todos/:id`, (req, res) => {
    var id = req.params.id
    var body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid(id)) {
        res.status(404).send()
        return console.log(`${id} not a valid id`);
    }


    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime()
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    },
    {
        new: true,
        useFindAndModify: false
    })
    .then((todo) => {
        if (!todo) {
            return res.status(404).send()
        }

        res.status(200).send({todo})
    })
    .catch(e => res.status(404).send(e))
})



app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    

    user.save()
        .then(() => {
            return user.generateAuthToken()
        })
        .then((token) => {
            res.header('x-auth', token).send(user).status(200)
        })
        .catch((e) => {
            console.log(e);
            res.status(400).send(e)
        });

})


app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user)
})


app.listen(port, () => {
    console.log(`Started on port ${port}`);
})

module.exports = {
    app
}

