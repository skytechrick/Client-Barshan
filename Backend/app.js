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
app.use('/files/img', express.static('../Frontend/Img'));
app.use('/product/img', express.static('../Frontend/Product_Img'));

// _________________________________________________________________
const Home = require("./Home/Home");
const Get_Signup_User = require("./User_Signup/Get_Signup_User");
const Post_Signup_User = require("./User_Signup/Post_Signup_User");
const Post_Signup_OTP_User = require("./User_Signup/Post_Signup_OTP_User");
const OTP_VERIF_Sign = require("./User_Signup/OTP_VERIF_Sign");
// _________________________________________________________________
const Get_Login = require("./User_Login/Get_Login");
const Post_Login = require("./User_Login/Post_Login");

const Dashboard_Product = require("./Dashboard_Product/Dashboard_Product.js");



app.get("/",Home)


app.get("/signup",Get_Signup_User)
app.post("/signup",Post_Signup_User)
app.get("/signup/otp",Post_Signup_OTP_User);
app.post("/signup/otp",OTP_VERIF_Sign);

app.get("/login",Get_Login);
app.post("/login",Post_Login);



app.get("/Dashboard_Product",Dashboard_Product);


app.get("/",async(req, res)=>{
    res.status(200).send("Hi");
});

app.listen(process.env.Port,()=>{console.log(`Node JS runned successfully at http://192.168.0.12:${process.env.Port}`)});