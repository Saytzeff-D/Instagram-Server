const cloudinary = require('cloudinary')
const UserModel = require('../models/user.model')
const PostModel = require('../models/post.model')
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
const register =(req, res)=>{
    let user = req.body
    console.log(req.body)
    UserModel.find({email: req.body.email}, (err, result)=>{
        console.log(result)
        if (result.length == 0) {
            let form = new UserModel(user)
            form.save((err)=>{
                if (err) {
                    res.send({msg: 'Error! Please try again'})
                } else {
                    res.send({msg: 'Success'})
                }
            })
        } else {
            res.send({msg: 'E-mail already exists'})
        }
    })
}
const login =(req, res)=>{
    let loginInfo = req.body
    UserModel.find(loginInfo, (err, result)=>{
        if (err) {
            res.status(400).send({msg: 'Server Error'})
        } else {
            if (result.length == 0) {
                res.status(200).send({msg: 'Login Failed!'})
            } else {
                // console.log(result)
                res.status(200).send({msg: 'Success', id: result[0]._id})
            }            
        }
    })
}
const userData =(req, res)=>{
    const _id = req.body
    UserModel.find(_id, (err, result)=>{
        if(err){
            console.log(err)
            res.status(300).send({msg: 'Server Timeout'})
        }else {
            res.status(200).send(result[0])
        }
    })
}
const profilePhoto =(req, res)=>{
    const image = req.body
    cloudinary.v2.uploader.upload(image.photo, {public_id: image.photoName}, (err, result)=>{
        if (err) {
            console.log(err)
            res.status(300).json({msg: 'Cloudinary Error'})
        } else {
            let photoUrl = result.secure_url
            UserModel.findByIdAndUpdate(req.body.id, {image_url: photoUrl}, (err, result)=>{
                if (err) {
                    res.status(400).json({msg: 'Mongo DB error'})
                } else {
                    res.json({imageUrl: photoUrl})
                }
            })
        }
    })
}
const editProfile = (req, res)=>{
    const id = req.body._id
    UserModel.findByIdAndUpdate(id, req.body, (err, result)=>{
        if(err){
            res.status(400).json("Edit Failed")
        }else{
            res.status(200).json("Success")
        }
    })
}
const fetchProfile = (req, res)=>{
    UserModel.findOne(req.body, (err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.status(200).json(result)
        }
    })
}
const createPost = (req, res)=>{
    const post = req.body
    cloudinary.v2.uploader.upload(post.mediaUrl, {resource_type: 'auto'}, (err, result)=>{
        if(err){
            console.log(err)
            res.status(400).json('Error')
        }else{
            post.mediaUrl = result.secure_url
            post.uploadDate = new Date().toUTCString()
            let postForm = new PostModel(post)
            postForm.save((err)=>{
                if(err){
                    res.status(400).json('Server Error')
                }else{
                    res.status(200).json({msg: 'Upload Successful'})
                }
            })
        }
    })
}
const viewAllPost = (req, res)=>{}

let ServerController = {register, login, userData, profilePhoto, editProfile, fetchProfile, createPost}
module.exports = ServerController