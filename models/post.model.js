const mongoose = require('mongoose')
let postSchema = mongoose.Schema({
    userId: String,
    mediaUrl: String,
    mediaType: String,
    caption: String,
    uploadDate: String
})

let PostModel = mongoose.model('posts', postSchema)
module.exports = PostModel