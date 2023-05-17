const crypto = require('crypto')
const express = require('express')
var cors = require('cors')
const auth = require('./auth').auth
const swaggerUi = require('swagger-ui-express');
const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const mongoUrl = "mongodb+srv://zairo:zairo@pwm.pkvpdx3.mongodb.net/?retryWrites=true&w=majority"
const swaggerDocument = require('./swagger-output.json');
const fs = require('fs');
const { MongoClient, BSON } = require('mongodb');


const app = express()
app.use(cors())
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

function hash(input){
    return crypto.createHash('md5')
    .update(input)
    .digest('hex')
}

async function addUser(res, user) {
    if (user.name == undefined) {
        res.status(400).send("Missing Name")
        return
    }
    if (user.surname == undefined) {
        res.status(400).send("Missing Surname")
        return
    }
    if (user.email == undefined) {
        res.status(400).send("Missing Email")
        return
    }
    if (user.password == undefined || user.password.length < 3) {
        res.status(400).send("Password is missing or too short")
        return
    }

    user.password = hash(user.password)
    
    var pwmClient = await new MongoClient(mongoUrl).connect()

    try{
        var item = await pwmClient.db("pwm").collection("user").insertOne(user)
        res.json(item)
    }catch (e){
        console.log("errore delete user")
        if (e.code == 11000){
            res.status(400).send("Utente già presente")
        }
        res.status(500).send(`Errore: ${e}`)
    }
}

async function removeUser(res, id){
    
    var pwmClient = await new mongoClient(mongoUrl).connect()
    var filter = { "_id": new ObjectId(id) }
    
    var delateUser = await pwmClient.db("pwm").collection("user").findOneAndDelete(filter)

    if (delateUser.lastErrorObject.n ==0){
        res.status(400).send("Utente non trovato")
        return
    }
    res.send(delateUser)
}

async function updateUser(res, id, updatedUser) {
    if (updatedUser.name == undefined) {
        res.status(400).send("Missing Name")
        return
    }
    if (updatedUser.surname == undefined) {
        res.status(400).send("Missing Surname")
        return
    }
    if (updatedUser.email == undefined) {
        res.status(400).send("Missing Email")
        return
    }
    if (updatedUser.password == undefined) {
        res.status(400).send("Missing Password")
        return
    }
    updatedUser.password = hash(updatedUser.password)
    
    try {

        var pwmClient = await new mongoClient(mongoUrl).connect()
        var filter = { "_id": new ObjectId(id) }
        var updatedUserToInsert = { $set: updatedUser}

        var item = await pwmClient.db("pwm").collection('users').updateOne(filter, updatedUserToInsert)
        res.send(item)

    } catch (e) {
        console.log('catch in test');
        if (e.code == 11000) {
            res.status(400).send("Utente già presente")
            return
        }
        res.status(500).send(`Errore generico: ${e}`)
    };
    

}

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/users', auth, async function (req, res) {
    var pwmClient = await new MongoClient(mongoUrl).connect()
    var item = await pwmClient.db("pwm").collection("user").find().project({"password":0}).toArray()
    res.json(item)
})

app.get('/users/:id', auth, async function (req, res) {
    // Ricerca nel database
    var id = req.params.id
    var pwmClient = await new MongoClient(mongoUrl).connect()
    var user = await pwmClient.db("pwm").collection("user").find({"_id": new ObjectId(id)}).project({"password" : 0}).toArray()

    res.json(user)
})

app.post("/users", auth, function (req, res) {
    addUser(res, req.body)
})

app.post("/login", async function (req, res) {
    login = req.body
    if (login.email == undefined) {
        res.status(400).send("Missing Email")
        return
    }
    if (login.password == undefined) {
        res.status(400).send("Missing Password")
        return
    }

    login.password = hash(login.password)

    var pwmClient = await new MongoClient(mongoUrl).connect()
    var filter = {$and:[{"email": login.email}, {"password": login.password}]}

    var loggedUser = await pwmClient.db("pwm").collection("user").findOne(filter)
    
    if (loggedUser == null){
        res.status(401).send("Unauthorized")
    }else{
        res.send({ id: loggedUser._id})
    }

})

app.put("/users/:id", auth, function (req, res) {
    updateUser(res, req.params.id, req.body)
    
})

app.delete("/users/:id", auth, function (req, res) {
    removeUser(res, req.params.id)
})

app.listen(3100, "0.0.0.0" ,()=>{
    console.log("server start (3100)")
})
