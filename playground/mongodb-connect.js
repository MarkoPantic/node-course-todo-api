//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to Mongoclient server');
    }
    console.log('Connected to Mongoclient server');

    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, res) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(res.ops, undefined, 2));
    // })



    db.collection('Users').insertOne({
        name: 'bla',
        age: 24,
        location: 'Beograd'
    }, (err, res) => {
        if (err) {
            return console.log('Unable to insert user into Users', err);
        }

        console.log(JSON.stringify(res.ops, undefined, 2));
        console.log(res.ops[0]._id.getTimestamp());
    })

    client.close();
});