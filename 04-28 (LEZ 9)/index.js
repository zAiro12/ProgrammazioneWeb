const crypto = require('crypto')
const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const fs = require('fs');

let rawUsers = fs.readFileSync('users.json') 
var users = JSON.parse(rawUsers)
console.log(users)

const app = express()
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const apiKey = "123456"


function checkApiKey(res, userApiKey) {
    if (userApiKey == apiKey) {
        return true
    }
    res.status(401).send("Non Autorizzato")
}

function hash(input){
    return crypto.createHash('md5')
    .update(input)
    .digest('hex')
}

function updateFile(){
    let usersRaw = JSON.stringify(users)
    fs.writeFileSync("users.json",usersRaw)
}

function addUser(res, user) {
    user.id = users.length +1
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
    users.push(user)
    updateFile()
}

function removeUser(res, id){
    let num = users.filter(user => user.id == id)
    if(num == -1){
        res.status(404).send("Missing Id")
        return
    }

    users = users.filter(user => user.id != id)
    updateFile()
    res.json(users)
}

function updateUser(res, id, updatedUser) {
    let index = users.findIndex(user => user.id == id)
    if (index == -1) {
        res.status(404).send("User not found")
        return
    }
    if (updatedUser.id != id) {
        res.status(400).send("Wrong Id")
        return
    }
  
    if (updatedUser.id == undefined) {
        res.status(400).send("Missing Id")
        return
    }
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
    users[index] = updatedUser
    updateFile()
    res.json(users)
}

app.get('/users', function (req, res) {
    if (checkApiKey(res, req.query.apikey)) {
        res.json(users)
    }

})

app.get('/users/:id', function (req, res) {
    // Ricerca nel database
    if (checkApiKey(res, req.query.apikey)) {
        var user = users.filter(user => user.id == req.params.id)
        res.json(user)
    }
})

app.post("/users", function (req, res) {
    /*	#swagger.parameters['obj'] = {
    in: 'body',
    description: 'User information.',          
    } */
    addUser(req.body)
    res.json(users)
})

app.post("/login", function (req, res) {
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

    let loggedUser = users.find( user => user.email == login.email && user.password == login.password )
    if (loggedUser == undefined){
        res.status(401).send("Unauthorized")
    }else{
        res.send({ id: loggedUser.id})
    }

})

app.put("/users/:id", function (req, res) {
    updateUser(res, req.params.id, req.body)
    
})

app.delete("/users/:id", function (req, res) {
    removeUser(res, req.params.id)
    res.json(users)
})

app.listen(3100)
