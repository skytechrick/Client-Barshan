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
const Dashboard_Product_Post = require("./Dashboard_Product/Dashboard_Product_Post.js");



const add_to_cart = require("./Order_Cart/add_to_cart.js");
const Cart_Get = require("./Order_Cart/Cart_Get.js");
const Cart_Update = require("./Order_Cart/Cart_Update.js");
const check_out = require("./Order_Cart/check_out.js");

const Profile_Page = require("./Order_Cart/Profile_Page.js");
const Profile_Update = require("./Order_Cart/Profile_Update.js");


const MensWear_First = require("./Cat/MensWear_First.js");
const WomensWear_First = require("./Cat/WomensWear_First.js");
const Hand_Printed_Collection_First = require("./Cat/Hand_Printed_Collection_First.js");
const Trending_Collection_First = require("./Cat/Trending_Collection_First.js");
const Covers_First = require("./Cat/Covers_First.js");

const Products_Page = require("./Products_Page.js");



app.get("/",Home)


app.get("/signup",Get_Signup_User)
app.post("/signup",Post_Signup_User)
app.get("/signup/otp",Post_Signup_OTP_User);
app.post("/signup/otp",OTP_VERIF_Sign);

app.get("/login",Get_Login);
app.post("/login",Post_Login);

app.get("/product/menswear",MensWear_First);
app.get("/product/womenswear",WomensWear_First);
app.get("/product/hand_printed_collections",Hand_Printed_Collection_First);
app.get("/product/trending_collections",Trending_Collection_First);
app.get("/product/back_cover_collections",Covers_First);


app.post("/add-to-cart",add_to_cart);
app.get("/cart",Cart_Get);
app.put("/cart/update", Cart_Update);
app.get("/check_out", check_out);

app.get("/order", require("./Order_Cart/Order_Page.js"));
app.put("/order", require("./Order_Cart/Placed_Order"));


app.get("/profile",Profile_Page);
app.put("/profile/update", Profile_Update);




app.get("/products/:URL", Products_Page);





const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../Frontend/Product_Img'));
    },
    filename: (req, file, cb) => {
        cb(null,  Date.now() +  "_" + file.fieldname + '_'  + file.originalname);
    }
});
const Photo_Upload = multer({ storage: storage });

const uploadMiddleware1 = Photo_Upload.fields([
    { name: 'File_1', maxCount: 1 },
    { name: 'File_2', maxCount: 1 },
    { name: 'File_3', maxCount: 1 },
    { name: 'File_4', maxCount: 1 },
    { name: 'File_5', maxCount: 1 }
]);

app.get("/Dashboard_Product/adddfgkujsdgskdggdsgfdsgfdgfgdsjfgsdjfgdsfgdklsgfgfksdgfsdjgfgfdjgfdgfjkdgfjdsgjfkdsgfjgsdfjsdfgdsklfdsfsdafgjsdfl",Dashboard_Product);

app.get("/Dashboard_Product/Order",require("./Dashboard_Order/Dashboard_Order.js"));
app.get("/Dashboard_Product/Order/Search",require("./Dashboard_Order/Dashboard_OrderSearch.js"));


app.get("*",async(req, res)=>{
    res.status(200).send("Page not Found");
});

app.listen(80,()=>{console.log(`Node JS runned successfully at http://lznqxtn8-80.inc1.devtunnels.ms:${process.env.Port}`)});
