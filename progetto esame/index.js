var cors = require("cors");
const path = require("path");
const crypto = require("crypto");
const express = require("express");
const ObjectId = require("mongodb").ObjectId;
const swaggerUi = require("swagger-ui-express");
const { MongoClient, BSON } = require("mongodb");
const mongoClient = require("mongodb").MongoClient;
const swaggerDocument = require("./swagger-output.json");
const { log } = require("console");


const port = 3000;
const CLIENTID = "ddf09a9bb13547bd8b545656016872ea"
const CLIENTSECRET = "7053573d05904ac79d8c3f56398c52d9"
const spotifybasicurl = "https://api.spotify.com/v1"
const linguaIT = "?market=IT"
var spotifyurl = "https://accounts.spotify.com/api/token"
const mongoUrl = "mongodb+srv://zairo:zairo@pwm.pkvpdx3.mongodb.net/?retryWrites=true&w=majority";


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


function hash(input) {
    return crypto.createHash('md5')
        .update(input)
        .digest('hex')
}

function reqToken(){
    fetch(spotifyurl,{
        method: "POST",
        headers: {
            Authorization: "Basic " + btoa(`${CLIENTID}:${CLIENTSECRET}`),
            "Content-Type": "application/x-www-form-urlencoded",
        },

        body: new URLSearchParams({ grant_type: "client_credentials" }),
    })
    .then((response) => response.json()) 
    .then((tokenResponse) => {
        console.log(tokenResponse.access_token)
        localStorage.setItem("token", tokenResponse.access_token)

        return(tokenResponse.access_token)
    })
}


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/registrazione', async function (req, res) {
    /*	#swagger.parameters['obj'] = {
    in: 'body',
    description: 'User information.',          
    } */
    utente = req.body
    
    if (utente.name == undefined || utente.name == "") {
        res.status(400).send("Campo nome vuoto")
        return
    }
    if (utente.surname == undefined || utente.surname == "") {
        res.status(400).send("Campo cognome vouto")
        return
    }
    if (utente.email == undefined || utente.email == "") {
        res.status(400).send("Campo email vuoto")
        return
    }
    if (utente.password == undefined || utente.password == "") {
        res.status(400).send("Campo password vuoto")
        return
    }else if (utente.password.length < 8){
        res.status(400).send("Password troppo corta")
    }

    utente.password = hash(utente.password)

    var pwmClient = await new mongoClient(mongoUrl).connect()
    try {
        var items = await pwmClient.db("progetto").collection('utenti').insertOne(utente)
        res.sendFile(path.join(__dirname, '/login.html'));

    }
    catch (e) {
        console.log('catch in test');
        if (e.code == 11000) {
            res.status(400).send("Utente già presente")
            return
        }
        res.status(500).send(`Errore generico: ${e}`)

    };

})

app.post("/login", async (req, res) => {
    var login = req.body

    if (login.id == undefined) {
        res.status(400).send("Username o Email vuota")
        return
    }
    if (login.password == undefined) {
        res.status(400).send("Password vuota")
        return
    }

    login.password = hash(login.password)

    var pwmClient = await new mongoClient(mongoUrl).connect()
    
    if (login.id.includes("@")){
        var filter = { "email": login.id }
        var filter_log = {
            $and: [
                { "email": login.id },
                { "password": login.password }
            ]
        }
    }else{
        var filter = { "username": login.id }
        var filter_log = {
            $and: [
                { "username": login.id },
                { "password": login.password }
            ]
        }

    }
    var cercaUser = await pwmClient.db("progetto").collection('utenti').findOne(filter);
    var loggedUser = await pwmClient.db("progetto").collection('utenti').findOne(filter_log);
    console.log(cercaUser, loggedUser)


    if (cercaUser == null) {
        res.status(401).json({messaggio:"Utente non esistente, Registrati ora", err:true})
    } else {
        if(loggedUser == null){
            res.status(401).json({messaggio: "Password sbagliata", err: true})
        }else{
            res.json(loggedUser)
        }
    }
})

app.get('/cercausername', async (req, res) => {
    const username = req.query.username; 

    var filter = {"username" : username}
    var pwmClient = await new mongoClient(mongoUrl).connect()
    var cercausername = await pwmClient.db("progetto").collection('utenti').findOne(filter);

    if (cercausername == null){
        res.send("ok")
    }else{
        res.send("Username già esistente")
    }
});

app.get('/cercamail', async (req, res) => {
    const mail = req.query.mail; 

    var filter = {"email" : mail}
    var pwmClient = await new mongoClient(mongoUrl).connect()
    var cercamail = await pwmClient.db("progetto").collection('utenti').findOne(filter);

    if (cercamail == null){
        res.send("ok")
    }else{
        res.send("Email già esistente")
    }
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Partito sulla porta ${port}`);
});