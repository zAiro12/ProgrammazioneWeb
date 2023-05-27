var cors = require('cors')
const path = require('path')
const crypto = require('crypto')
const express = require('express')
const ObjectId = require('mongodb').ObjectId
const swaggerUi = require('swagger-ui-express')
const { MongoClient, BSON } = require('mongodb');
const mongoClient = require('mongodb').MongoClient
const swaggerDocument = require('./swagger-output.json')

const mongoUrl = "mongodb+srv://zairo:zairo@pwm.pkvpdx3.mongodb.net/?retryWrites=true&w=majority"

const port = 3000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

function hash(input){
    return crypto.createHash('md5')
    .update(input)
    .digest('hex')
}

app.get('/',  (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/ciao',  (req, res) => {
    res.send("ciao!")
})

app.listen(port, "0.0.0.0" , () => {
    console.log(`Partito sulla porta ${port}`)
})