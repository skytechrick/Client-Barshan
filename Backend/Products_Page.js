
const {Products} = require("./Models.js");

const NumINR = require("./Mod/NumINR.js")

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

    if (fg ==1) {
                
        let KL = {
            Title: Pro.Title,
            P_ID: Pro._id,
            Description: Pro.Description,
            MRP: NumINR(Pro.MRP),
            Selling_Price: NumINR(Pro.Selling_Price),
            Im: Imss,
            URL1:URL1,
        }
        res.status(404).render("Product_Page", KL);
    }else{
        res.status(404).send("<center><h1>404 Error - Product Page not found</h1></center>");
    }
}
module.exports = Products_Page;