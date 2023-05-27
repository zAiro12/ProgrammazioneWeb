var cors = require("cors");
const path = require("path");
const crypto = require("crypto");
const express = require("express");
const ObjectId = require("mongodb").ObjectId;
const swaggerUi = require("swagger-ui-express");
const { MongoClient, BSON } = require("mongodb");
const mongoClient = require("mongodb").MongoClient;
const swaggerDocument = require("./swagger-output.json");
const LocalStorage = require('node-localstorage').LocalStorage;

localStorage = new LocalStorage('./scratch');

const CLIENTID = "ddf09a9bb13547bd8b545656016872ea"
const CLIENTSECRET = "7053573d05904ac79d8c3f56398c52d9"
const spotifybasicurl = "https://api.spotify.com/v1"
const linguaIT = "?market=IT"
var spotifyurl = "https://accounts.spotify.com/api/token"
const mongoUrl = "mongodb+srv://zairo:zairo@pwm.pkvpdx3.mongodb.net/?retryWrites=true&w=majority";

const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

function hash(input) {
    return crypto.createHash("md5").update(input).digest("hex");
}

function get(apitoken, id, res, get) {
    fetch(`${spotifybasicurl}/${get}/${id}${linguaIT}`, {
        headers:{Authorization: "Bearer " + apitoken}
    })
        .then(response => {
            if (!response.ok) {
                response.json().then(data => res.status(401).send(data.status_message))
                return
            }
            response.json().then(ris => {
                if (get == "album"){
                    mostraAlbum(ris)
                }else if (get == "tracks"){
                    mostraTraccia(ris)
                }
            })
        })
        .catch(error => res.status(401).send(error))
}

app.get("/", (req, res) => {
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

        res.send(tokenResponse.access_token)
    })
    // res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/luca", async (req, res) => {
    var pwmClient = await new MongoClient(mongoUrl).connect();
    var users = await pwmClient
        .db("progetto")
        .collection("utenti")
        .find()
        .toArray();
    res.json(users);
});

app.get("/album/:id", async (req, res) => {
    var apitoken = localStorage.getItem("token")
    var id = req.params.id
    
    get(apitoken, id, res, "album")
});

app.get("/traccia/:id", async (req, res) => {
    var apitoken = localStorage.getItem("token")
    var id = req.params.id
    
    get(apitoken, id, res, "tracks")
});

app.get("/tango", async (req, res) => {
    var apitoken = localStorage.getItem("token")
    console.log(apitoken)
    var id = "7CufDALaisOBzcT0nfeaZF"
    
   fetch(`${spotifybasicurl}/tracks/${id}${linguaIT}`, {
        headers:{Authorization: "Bearer " + apitoken}
   })
   .then(response => response.json())
   .then(traccia => res.send(traccia.name))
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Partito sulla porta ${port}`);
});
