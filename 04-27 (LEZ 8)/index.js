const express = require('express')
const app = express()
const apiKey = "123456"
var users = [
    {id: 1, name: "Luca", surname: "Airoldi"}, 
    {id: 2, name: "Sofia", surname: "Zanelli"}
]

app.get('/', function(req, res) {
    res.send('root')
})


app.get('/users', function(req, res) {
    if (req.query.apikey == apiKey){
        res.json(users)
    }else{
        res.status(401).send("NON AUTORIZZATO")
    }
})

app.get('/users/:id', function(req, res) {
   var user = users.filter(user => user.id == req.params.id)
   res.json(user)
})

app.post("/users/", function(req, res) {
    addUser(req.body)
    res.json(users)
})

app.put("/users/", function(req, res) {
    updateUser(req.body)
    res.json(users)
})

app.listen(3000)

console.log("ONLINE")

function addUser(user){
    users.push(user)
}

function updateUser(user){
    index = users.findIndex(uers => user.id)
}