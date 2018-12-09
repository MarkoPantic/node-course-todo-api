//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to Mongoclient server');
    }
    console.log('Connected to Mongoclient server');

    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5c0cdf3303a11d1c8c937e2e')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // })
    // .then((res) => {
    //     console.log(res);
    // })




    db.collection('Users').findOneAndUpdate({
        name: 'bla'
    }, {
        $set: {
            name: 'Marko'
        },
        $inc: {
            age: +1
        }
    }, {
        returnOriginal: false
    })
    .then((res) => {
        console.log(res);
        client.close();
    })

});