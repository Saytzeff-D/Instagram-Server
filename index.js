const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}))
app.use(bodyParser.json({limit: '50mb'}))
const cors = require('cors')
app.use(cors())
const router = require('./routes/route')
app.use('/', router)
const mongoose = require('mongoose')
const URI = process.env.URI
mongoose.connect(URI, (err)=>{
    if (err) {
        console.log('Unable to connect mongoose')
    } else {
        console.log('Mongoose connected successfully')
    }
})

app.get('/', (req, res) => {
    res.send('Hello World!')
    console.log('Hello World')
})
app.listen(port, () => {
console.log(`Instagram Server listening on port ${port}!`)
})