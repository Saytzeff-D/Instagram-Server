const express = require('express')
const router = express.Router()
const ServerController = require("../controllers/server.controller")

router.post("/register", ServerController.register)
router.post("/login", ServerController.login)
router.post("/userData", ServerController.userData)
router.post('/profilePhoto', ServerController.profilePhoto)
router.post('/editProfile', ServerController.editProfile)
router.post('/fetchProfile', ServerController.fetchProfile)
router.post('/createPost', ServerController.createPost)

module.exports = router