var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express()

var User = require('./models/User.js')
var auth = require('./auth.js')

//placeholder for posts
var posts = [
    {message: 'hello'},
    {message: 'hi'}
]

//using CORS middleware. It is needed for resolving different front-back servers urls access controll
app.use(cors())

app.use(bodyParser.json())

// hello world example
app.get('/posts', (req, res) => {
    res.send(posts)
})

app.get('/users', async (req, res) => {
    try {
        var users = await User.find({}, '-pwd -__v')
        res.send(users)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
    
})

app.get('/profile/:id', async (req, res) => {
    try {
        var user = await User.findById(req.params.id, '-pwd -__v')
        res.send(user)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
    
})



//connecting database
mongoose.connect('mongodb://sysstas:chdels@ds247078.mlab.com:47078/socialdb', (err) => {
    if(!err)
        console.log('connected to mongo')
})

app.use('/auth', auth)
// server launch
app.listen(3000)