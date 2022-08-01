const express = require('express');
const app = express();
const dotenv = require("dotenv");
const morgan = require('morgan');
const bodyParser = require('body-parser');
dotenv.config({path : 'config.env'});
const PORT = process.env.PORT || 8080;
const path = require("path");
const connectDB = require("./server/database/connection");

// log requests
app.use(morgan('tiny'));

// parser request to body-parser
app.use(bodyParser.urlencoded({extended:true}))


// mongo connect DB
connectDB();

// set view engine
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views/ejs")); ==> for specific path

// load routers
app.use("/", require("./server/routes/router"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));

app.listen(PORT, ()=>{console.log("Server is running on port: "+ PORT)})