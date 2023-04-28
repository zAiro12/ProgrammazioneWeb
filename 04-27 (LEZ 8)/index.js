const { raw } = require('body-parser')
const express = require('express')
const fs = require('fs')

let rawUsers = fs.readFileSync('users.json') 
var users = JSON.parse(rawUsers)
console.log(users)

const app = express()
app.use(express.json())
const apiKey = "123456"


function checkApiKey(res, userApiKey) {
    if (userApiKey == apiKey) {
        return true
    }
    res.status(401).send("Non Autorizzato")
}

function updateFile(){
    let usersRaw = JSON.stringify(users)
    fs.writeFileSync("users.json", usersRaw)
}

function addUser(user) {
    user.id = users.length + 1
    if (user.name == undefined) {
        res.status(400).send("Missing Name")
        return
    }
    if (user.surname == undefined) {
        res.status(400).send("Missing Surname")
        return
    }

    users.push(user)
    updateFile()
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
    addUser(req.body)
    res.json(users)
})

app.put("/users/:id", function (req, res) {
    updateUser(res, req.params.id, req.body)
})

app.listen(3100)