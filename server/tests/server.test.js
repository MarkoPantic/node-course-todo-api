const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');



const todos = [
    {
        _id: new ObjectID(),
        text: 'First text todo'
    },
    {
        _id: new ObjectID(),
        text: 'Second text todo'
    }
]
beforeEach((done) => {
    Todo.deleteMany()
        .then(() => {
            Todo.insertMany(todos)
        })
        .then(() => done())
})

describe('POST /todos', () => {
    it('Should create a new todo', (done) => {
        var text = 'Test todo text'

        request(app)
            .post('/todos')
            .send({
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }

                Todo.find({text})
                    .then((todos) => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done()
                    })
                    .catch((e) => done(e))
            })
    })


    it('Should not create Todo with invalid data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }

                Todo.find()
                    .then((todos) => {
                        expect(todos.length).toBe(todos.length)
                        done()
                    })
                    .catch((e) => done(e))
            })
        
    })
})


describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(todos.length)
            })
            .end(done)
    })
})


describe('GET /todos/:id', () => {
    it('Should return todo document', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done)
    })

    it('Should return 404 if todo not found', (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done)
    })

    it('Should return 404 for non-object ids', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done)
    })
})