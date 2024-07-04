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

app.use('/files/css', express.static('../Frontend/Css'));
app.use('/files/js', express.static('../Frontend/Js'));

// _________________________________________________________________
const Get_Signup_User = require("./User_Signup/Get_Signup_User");
const Post_Signup_User = require("./User_Signup/Post_Signup_User");
// _________________________________________________________________


app.get("/signup",Get_Signup_User)
app.post("/signup",Post_Signup_User)








app.get("/",async(req, res)=>{
    res.status(200).send("Hi");
});

app.listen(process.env.Port,()=>{console.log(`Node JS runned successfully at http://192.168.68.57:81:${process.env.Port}`)});