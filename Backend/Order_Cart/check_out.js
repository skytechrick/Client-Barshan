
const User_Auth = require("../User_Auth.js");
const NumINR = require("../Mod/NumINR.js");

const {Products, User_Profile} =  require("../Models.js");


const check_out = async (req, res) =>{


    // let data = await User_Profile.find({});

    

    let cook = req.cookies.ID;
    let Auths = await User_Auth(cook);
    if (Auths != null) {
        if(Auths.Address.length > 10){
            let Cart = Auths.Cart;
            if(Cart){
                if (Cart.length >=1) {
                    let AddedOne = "";


                    let MMP = 0;
                    let Grand_TOTAL = 0;

                    for (let p = 0; p < Cart.length; p++) {
                        const element = Cart[p];

                        if (element.Category == "Back Cover Collection") {
                            
                        }else{

                            

                            let Carta = element.ID;
                            
                            let data = await Products.find({});
                            let a = 1;
                            let Found;
                            for (let r = 0; r < data.length; r++) {
                                const element = data[r];
                                if (element._id == Carta) {
                                    a = 2;
                                    Found = element;
                                    break;
                                }
                            }
                            
                            if (a == 2) {
                                let T = Found.Title;
                                let MRP = Found.MRP;
                                MMP+= Number(MRP);
                                let Selling_Price = Found.Selling_Price;
                                Grand_TOTAL+= Number(Found.Selling_Price);
                                // let Selling_Price = Found.Selling_Price;

                                // console.log(element.Option);
                                AddedOne += `<tr>
                                    <td>${T}</td>
                                    <td>${element.Option}</td>
                                    <td>Rs. ${NumINR(Selling_Price)}</td>

                                </tr>`;
                            }
                        };
                        

                    }
                    // console.log(AddedOne);
                    let fg = {
                        Product:AddedOne, 
                        MRP:NumINR(MMP),
                        Grand_TOTAL:NumINR(Grand_TOTAL),
                        Discount:NumINR(MMP - Grand_TOTAL),
                        Address:Auths.Name +"<br>" +Auths.Mobile_Number + "<br>" + Auths.Address,
                        PIN:Auths.PIN,
                    }
                    res.status(200).render("CheckOut_Page.pug",fg);
                }else{
                    res.status(200).redirect("/cart");
                }

            }else{
                res.status(200).redirect("/cart");

            }






            
        }else{
            res.status(200).redirect("/profile");
        }
    }else{
        res.clearCookie("ID");
        res.status(200).redirect("/login");
    }

}
module.exports = check_out;