

const User_Auth = require("../User_Auth.js");

const {Products} =  require("../Models.js");
const NumINR = require("../Mod/NumINR.js");


const MensWear_First = async (req, res) => {


    let All = await Products.find({});
    let fin = "";
    for (let i = 0; i < All.length; i++) {
        const element = All[i];
        if(element.Category == "Drinks"){

        
        
    
            let Product_Image = element.Images[0];
            let Product_Url = element.URL;
            let Title = element.Title;
            let MRP = NumINR(element.MRP);
            let Sell = NumINR(element.Selling_Price);
            let P_ID = element._id;

            let data = `
                <div class="productStart">
                    <a href="/products/${Product_Url}">
                        <img src="${Product_Image}" alt="Product Image">
                    </a>
                    <h2 class="P_Title">
                        <a href="/products/${Product_Url}"><center>${Title}</center></a>
                    </h2>
                    <div class="price kl TYTYT">
                        <div>MRP: ${MRP}</div>
                    </div>
                    <div class="price TYTYT">
                        <div>Rs. ${Sell}</div>
                    </div>
                    <div class="price">
                        <button title="Add to cart" class="ADDTOCART" onclick="Add_to_Cart('${P_ID}')" type="button">Add to cart</button>
                    </div>
                    <div class="price">
                        <button title="Buy Now" class="ADDTOCART ADDTOCAR" onclick="Buy_Now('${P_ID}')" type="button">Buy Now</button>
                    </div>
                </div>`;
            fin+=data;
        }
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
        res.status(200).render("Drinks",{P:fin, NAV: Login, Script1:"HomeLog"});
        
    }else{ 
        let a = `
        <div id="INNSTSTR6">
        <a href="/login">Login</a>
        </div>`;
        res.clearCookie("ID");
        res.status(200).render("Drinks",{P:fin, NAV: a, Script1:"Home"});

    }
}
module.exports = MensWear_First;