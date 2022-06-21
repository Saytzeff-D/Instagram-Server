const mongoose = require('mongoose')
let userSchema = mongoose.Schema({
    fullName: String,
    userName: String,
    mobileNumber: String,
    email: String,
    pword:  String,
    bio: String,
    image_url: String
})

let UserModel = mongoose.model('users', userSchema)
module.exports = UserModel