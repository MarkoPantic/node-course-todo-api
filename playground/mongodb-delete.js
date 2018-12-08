//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to Mongoclient server');
    }
    console.log('Connected to Mongoclient server');

    const db = client.db('TodoApp');

    // Delete many

    // db.collection('Todos').deleteMany({
    //     text: 'Eat lunch'
    // })
    // .then((res) => {
    //     console.log(res);
    // })

    // Delete one

    // db.collection('Todos').deleteOne({
    //     text: 'Eat lunch'
    // })
    // .then((res) => {
    //     console.log(res);
    // })

    // findOne and Delete

    // db.collection('Todos').findOneAndDelete({
    //     completed: false
    // })
    // .then((res) => {
    //     console.log(res);
    // })


    db.collection('Users').deleteMany({
        name: 'Bogdan'
    })
    

    db.collection('Users').findOneAndDelete({
        name: 'bla'
    })
    .then((res) => {
        console.log(JSON.stringify(res, undefined, 2));
        client.close();
    })

});