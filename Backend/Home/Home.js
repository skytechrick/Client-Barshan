


const User_Auth = require("../User_Auth.js");



const {Products} =  require("../Models.js");
const NumINR = require("../Mod/NumINR.js");



const Home = async (req, res) => {

    // res.status(200).render("Home");
    
    let All = await Products.find({});
    let d = "";
    for (let i = All.length-1; i > All.length - 20; i--) {
        const element = All[i];

        let Product_Image = element.Images[0];
        let Product_Url = element.URL;
        let Title = element.Title;
        let MRP = NumINR(element.MRP);
        let Sell = NumINR(element.Selling_Price);
        let P_ID = element._id;

        d = `
            
                <div class="productStart1">
                    <a href="/products/${Product_Url}">
                        <img src="${Product_Image}" alt="Product Image">
                    </a>
                    <h2 class="P_Title1">
                        <a href="/products/${Product_Url}"><center>${Title}</center></a>
                    </h2>
                    <div class="price1 kl1 TYTYT1">
                        <div>MRP: ${MRP}</div>
                    </div>
                    <div class="price1 TYTYT1">
                        <div>Rs. ${Sell}</div>
                    </div>
                    <div class="price1">
                        <button title="Add to cart" class="ADDTOCART1" onclick="Add_to_Cart('${P_ID}')" type="button">Add to cart</button>
                    </div>
                    <div class="price1">
                        <button title="Buy Now" class="ADDTOCART1 ADDTOCAR1" onclick="Buy_Now('${P_ID}')" type="button">Buy Now</button>
                    </div>
                </div>
            ` + d;
    };
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    let cook = req.cookies.ID;
    let Auths = await User_Auth(cook);

    if (Auths != null) {
        let Login = `
            <div id="CatM">
                <a href="/order">Order</a>
            </div>
            <div id="INNSTSTR6">
                <a href="/cart">Cart</a>
            </div>
            <div id="INNSTSTR7">
                <a href="/logout">Logout</a>
            </div>
            `;
        res.status(200).render("Home",{NAV: Login, ProductSuggest:d, Script1:"HomeLog"});
        
    }else{ 
        let a = `
        <div id="INNSTSTR6">
        <a href="/login">Login</a>
        </div>`;
        res.clearCookie("ID");
        res.status(200).render("Home",{NAV: a, ProductSuggest:d, Script1:"Home"});

    }
}

module.exports = Home;