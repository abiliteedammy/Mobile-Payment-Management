//importing express to start the server and the database mysql
const express = require("express");
const path = require('path')
const mysql = require("mysql");
const dotenv = require('dotenv');

const app = express();
// creating path to store sensitive information
dotenv.config({path:'./.env'})

// creating a database connection

const db = mysql.createConnection({
    host: process.env.DB_Host,
    user: process.env.DB_User,
    password: process.env.DB_Password,
    database: process.env.DB
});

// directory for keeping all front end files
const publicDirectory = path.join(__dirname, './public/style');
app.use(express.static(publicDirectory));


//Passing information to nodejs the engine to use
app.set('view engine', 'hbs');


//catching and reporting error through console.log
db.connect( (error) => {
    if(error) {
        console.log(error)
    }   else{
        console.log("MYSQL Connected...")
    }
})

// this get the request to be sent to the server
app.get("/", (req,res) => {
    //res.send("<hi> Home Page</h1>")
    res.render("index")

});

//starting the serve at port 5000
app.listen(5000, () => {
    console.log("Server started on Port 5000");
})

