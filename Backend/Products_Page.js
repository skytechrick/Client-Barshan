
const {Products} = require("./Models.js");

const NumINR = require("./Mod/NumINR.js");

const User_Auth = require("./User_Auth.js");

const Products_Page = async (req, res) => {

    let URL = req.params.URL;
    let All =  await Products.find({});
    let fg = 2;
    let Pro;
    for (let index = 0; index < All.length; index++) {
        const element = All[index];
        if (element.URL == URL) {
            fg = 1;
            Pro = element
            break;
        }
        
    }
    let Imss = ``;
    let As = Pro.Images;
    let URL1 = Pro.Images[0];
    for (let i = 0; i < As.length; i++) {
        const element = As[i];
        let a = `<button class="IMG_BTN" onclick="P_LIST(${i+1});">
                    <img id="P_LIST${i+1}" class="P_LIST" src="${element}" alt="Product_Img">
                </button>`
        Imss += a;
        
    }
    let DD;

    if (fg ==1) {
            
        let All = await Products.find({});
        let d = "";
        let z = 0;
        for (let i = All.length-1; i > 0; i--) {
            const element = All[i];
            if (element.Category == Pro.Category) {
                
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
                z++;
                if (z == 10) {
                    break;
                }
            };
            
                    
    
            
        }
        DD = d;
        
        
        let cook = req.cookies.ID;
        let Auths = await User_Auth(cook);

        if (Auths != null) {
            let KL = {
                Title: Pro.Title,
                P_ID: Pro._id,
                Description: Pro.Description,
                MRP: NumINR(Pro.MRP),
                Selling_Price: NumINR(Pro.Selling_Price),
                Im: Imss,
                URL1: URL1,
                NAV:`<div id="CatM">
                        <a href="/order">Order</a>
                    </div>
                    <div id="INNSTSTR6">
                        <a href="/cart">Cart</a>
                    </div>
                    <div id="INNSTSTR7">
                        <a href="/logout">Logout</a>
                    </div>
                    `,
                ProductSuggest:DD,
                
                Script1:"HomeLog"
            }
            res.status(200).render("Product_Page", KL);
            
        }else{ 
            let KL = {
                Title: Pro.Title,
                P_ID: Pro._id,
                Description: Pro.Description,
                MRP: NumINR(Pro.MRP),
                Selling_Price: NumINR(Pro.Selling_Price),
                Im: Imss,
                URL1: URL1,
                NAV: `
                <div id="INNSTSTR6">
                <a href="/login">Login</a>
                </div>`,
                ProductSuggest:DD,
                
                Script1:"Home",
            }
            // let a =;
            res.clearCookie("ID");
            res.status(200).render("Product_Page",KL);

        }
        // res.status(200).render("Product_Page", KL);
    }else{
        res.status(404).send("<center><h1>404 Error - Product Page not found</h1></center>");
    }
}
module.exports = Products_Page;