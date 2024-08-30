require('dotenv').config();

const HIHI = "ZIPBUY - 1.4.2.apk";

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
app.use('/uploaded_image', express.static('../Frontend/Uploaded_Image'));

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



app.get("/",Home);


app.get("/signup",Get_Signup_User);
app.post("/signup",Post_Signup_User);
app.get("/signup/otp",Post_Signup_OTP_User);
app.post("/signup/otp",OTP_VERIF_Sign);

app.get("/login",Get_Login);
app.post("/login",Post_Login);

app.get("/product/menswear",MensWear_First);
app.get("/product/womenswear",WomensWear_First);
app.get("/product/hand_printed_collections",Hand_Printed_Collection_First);
app.get("/product/trending_collections",Trending_Collection_First);
app.get("/product/back_cover_collections",Covers_First);

app.get("/product/electronics",require("./Cat/Electronics_First.js"));
app.get("/product/jewellery",require("./Cat/Jewellery_First.js"));
app.get("/product/bags",require("./Cat/Bags_First.js"));
app.get("/product/daily_used_accessories",require("./Cat/Daily_used_accessories_First.js"));
app.get("/product/customize_products",require("./Cat/Customize_products_First.js"));
app.get("/product/cake",require("./Cat/Cake.js"));
app.get("/product/drinks",require("./Cat/Drinks.js"));

app.get("/product/food/",require("./Cat/Food/Home.js"));
app.get("/product/food/swapan_restaurant",require("./Cat/Food/Swapan_Restaurant.js"));
app.get("/product/food/pizza_point_kitchen",require("./Cat/Food/pizza_point_kitchen.js"));
app.get("/product/food/petuk_restaurant",require("./Cat/Food/petuk_restaurant.js"));
app.get("/product/food/friedwala",require("./Cat/Food/friedwala.js"));
app.get("/product/food/7th_heaven",require("./Cat/Food/7th_heaven.js"));
app.get("/product/food/shankha_restaurant",require("./Cat/Food/shankha_restaurant.js"));
app.get("/product/food/kohili_masala_kitchen",require("./Cat/Food/kohili_masala_kitchen.js"));

app.get("/product/grocery",require("./Cat/grocery/Home.js"));
app.get("/product/grocery/dal_ata",require("./Cat/grocery/dal_ata.js"));
app.get("/product/grocery/tea_coffee",require("./Cat/grocery/tea_coffee.js"));
app.get("/product/grocery/masala_oil",require("./Cat/grocery/masala_oil.js"));
app.get("/product/grocery/sugar_salt",require("./Cat/grocery/sugar_salt.js"));
app.get("/product/grocery/tooth_brush_paste",require("./Cat/grocery/tooth_brush_paste.js"));
app.get("/product/grocery/milk",require("./Cat/grocery/milk.js"));
app.get("/product/grocery/rice",require("./Cat/grocery/rice.js"));
app.get("/product/grocery/biscuit_noodles",require("./Cat/grocery/biscuit_noodles.js"));



app.post("/add-to-cart",add_to_cart);
app.post("/buyNow",require("./Order_Cart/AdBuynow.js"));







const UserStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../Frontend/Uploaded_Image'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() +  "_" + Date.now() + 1  + "_" + file.fieldname + file.originalname);
    }
});

const Img_Upload = multer({ storage: UserStorage });

const Img_UploadFinal = Img_Upload.fields([
    { name: 'File_1', maxCount: 1 },
]);


app.get("/cart", Cart_Get);


app.put("/cart/update",Img_UploadFinal, Cart_Update);



// app.get("/buy_now",require("./Order_Cart/Buy_Now.js"));
app.get("/check_out", check_out);
app.get("/terms-and-conditions", require("./TandC.js"));

app.get("/order", require("./Order_Cart/Order_Page.js"));
app.put("/order", require("./Order_Cart/Placed_Order"));


app.get("/profile",Profile_Page);
app.put("/profile/update", Profile_Update);

app.get("/logout",(req, res)=>{
    res.clearCookie("ID");
    res.status(200).redirect("/login");
});

app.get("/products/:URL", Products_Page);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../Frontend/Product_Img'));
    },
    filename: (req, file, cb) => {
        cb(null,  Date.now() +  "_" + file.fieldname + '_'  + file.originalname);
    },
});
const Photo_Upload = multer({ storage: storage });

const uploadMiddleware1 = Photo_Upload.fields([
    { name: 'File_1', maxCount: 1 },
    { name: 'File_2', maxCount: 1 },
    { name: 'File_3', maxCount: 1 },
    { name: 'File_4', maxCount: 1 },
    { name: 'File_5', maxCount: 1 },
]);

app.get("/Dashboard_Product/adddfgkujsdgskdggdsgfdsgfdgfgdsjfgsdjfgdsfgdklsgfgfksdgfsdjgfgfdjgfdgfjkdgfjdsgjfkdsgfjgsdfjsdfgdsklfdsfsdafgjsdfl",Dashboard_Product);

app.post("/app_download",(req, res)=>{
    const filePath = path.join(__dirname, 'APP', HIHI);
    res.download(filePath, 'ZIPBUY - 1.4.2.apk', (err) => {
        if (err) {
            // console.error('File download failed:', err);
            res.status(500).send('Error downloading the file.');
        };
    });
1});

app.get("/app_download",(req, res)=>{
    res.status(200).send(`
        <style>
            .cen{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                flex-direction: column;    
            }
            .cent{
                border: 1px solid rgb(118, 118, 118);
                padding: 15px;
                box-lines:  0 0 10px #aaa;
                background-color: rgb(192, 235, 255);
                font-weight: bold;
                cursor: pointer;
                transition: 200ms background-color;
                border-radius: 40px;
                
            }
            .cent:hover{
                background-color: rgb(74, 198, 255);

            }
            #Wait {
                display: none;
            }
        </style>

        <form class="cen" action="/app_download" method="post">
            <h1>ZIPBUY</h1>
            <button class="cent" type="submit" onclick="document.getElementById('Wait').style.display = 'block'">Download now</button>
            <h1>ZIPBUY</h1>
            <p id="Wait">Please wait</p>

        </form>
        `);

});

app.post("/dashboard_product/add", uploadMiddleware1,Dashboard_Product_Post);

app.get("/Dashboard_Product/Ordersafsdfgedtffgikhweopfhe324idsgfdsgfjkdsfgdsuigfdsgoriy384ty8dfgfdgdfgfd",require("./Dashboard_Order/Dashboard_Order.js"));
app.get("/Dashboard_Product/safsfsddfdsfdfsgdjkfgdhfjsdkfdsgfdgsfdsjhfdsfdsgfdsgfdgsfd7sftdsf8dsftsdfsdo89fydsfsd8fdOrder/Search",require("./Dashboard_Order/Dashboard_OrderSearch.js"));
app.post("/Dashbord/order/update",require("./Dashboard_Order/Dashboard_OrderSearch_Update.js"));

app.get("*",async(req, res)=>{
    res.status(200).send("Page not Found");
});

app.listen(process.env.Port,()=>{console.log(`Node JS runned successfully at http://localhost:${process.env.Port}`)});
