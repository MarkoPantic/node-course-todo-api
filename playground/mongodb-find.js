//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to Mongoclient server');
    }
    console.log('Connected to Mongoclient server');

    const db = client.db('TodoApp');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5c0bca06f6701bba608db128')
    // }).toArray()
    //     .then((res) => {
    //         console.log('Todos');
    //         console.log(JSON.stringify(res, undefined, 2));
    //     })
    //     .catch(err)

    db.collection('Users').find({
        name: 'Marko'
    }).toArray()
        .then((res) => {
            console.log('Todos');
            console.log(JSON.stringify(res, undefined, 2));
        })
        .catch(err)

    //client.close();
});