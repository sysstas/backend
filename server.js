var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express()

var User = require('./models/User.js')
var Post = require('./models/Post.js')
var auth = require('./auth.js')



//using CORS middleware. It is needed for resolving different front-back servers urls access controll
app.use(cors())

app.use(bodyParser.json())

// hello world example
app.get('/posts/:id', async (req, res) => {
    var author = req.params.id
    var posts = await Post.find({author})
    res.send(posts)
})

app.post('/post', (req, res) => {
    var postData = req.body
    postData.author = '5a9867182f3aac15c8a0a6e4'

    var post = new Post(postData)
    

    post.save((err, result) => {
        if(err){
            console.error('saving post error')
            return res.status(500).send({message: 'saving post error'})
        }
        res.sendStatus(200)
    })
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