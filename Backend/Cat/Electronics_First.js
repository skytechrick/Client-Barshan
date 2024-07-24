
const NumINR = require("../Mod/NumINR.js");

const {Products} =  require("../Models.js");


const Electronics_First = async (req, res) => {


    let All = await Products.find({});
    let fin = "";
    for (let i = 0; i < All.length; i++) {
        const element = All[i];
        if(element.Category == "Electronics"){

        
        
    
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
    res.status(200).render("Electronics_First",{P:fin});
}
module.exports = Electronics_First;