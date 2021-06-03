const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const categoriesController = require("./controller/categiresController")
const articlesController = require("./controller/articlesController")


//database
connection.authenticate()
    .then(()=>{console.log("conectado com sucesso")})
    .catch((e)=>{console.log("error")})

//view engine
app.set("view engine", "ejs")

//use
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//server
app.listen(3000,()=>{})


//rotas
app.use("/categories", categoriesController)
app.use("/article", articlesController)