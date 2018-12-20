const express = require('express');
var bodyParser = require('body-parser');
const _ = require('lodash')

const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const { ObjectID } = require('mongodb');

var app = express();
const port = process.env.PORT || 3000


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
    console.log(`oov je gore`, req);

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime()
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    console.log(body);

    Todo.findByIdAndUpdate(id, {
        $set: body
    },
    {
        new: true,
        useFindAndModify: false
    })
    .then((todo) => {
        console.log(`usao sam ovde`, todo);
        if (!todo) {
            return res.status(404).send()
        }

        res.status(200).send({todo})
    })
    .catch(e => res.status(404).send())
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

