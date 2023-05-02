/* Scrivere le api che gestiscano utenti
Validare i seguenti campi affinchè siano tutti popolati

Id
Nome
Cognome
E-mail
Password

Controllare l'esistenza dell'utente nell'eliminazione e nell'aggiornamento

Inserire un utente
Rimuovere un utente
Aggiornare un utente
*/
const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const fs = require('fs');
const { NOMEM } = require('dns');

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

function updateFile(){
    let usersRaw = JSON.stringify(users)
    fs.writeFileSync("users.json",usersRaw)
}

function addUser(user, res) {
    user.id = users.length +1
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
    addUser(req.body, res)
    res.json(users)
})

app.put("/users/:id", function (req, res) {
    updateUser(res, req.params.id, req.body)
    
})

app.listen(3100)
