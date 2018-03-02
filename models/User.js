var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var userScema = mongoose.Schema({
    email: String,
    pwd: String,
    name: String,
    description: String
})

// making middleware for encripting password before saving to database
userScema.pre('save', function(next){
    var user = this
    
    if (!user.isModified('pwd'))
        return next()

    bcrypt.hash(user.pwd, null, null, (err, hash) =>{
        if(err)  return next(err)

        user.pwd = hash
        next()
    })
})

module.exports = mongoose.model('User', userScema)