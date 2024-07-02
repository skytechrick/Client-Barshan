require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.set("view engine","pug");
app.set("views", path.join(__dirname, "../Frontend/Pug"));









app.get("/",async(req, res)=>{
    res.status(200).send("Hi");
});

app.listen(process.env.Port,"192.168.0.12",()=>{console.log(`Node JS runned successfully at http://192.168.0.12:${process.env.Port}`)});