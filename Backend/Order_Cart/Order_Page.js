

const User_Auth = require("../User_Auth.js");
const NumINR = require("../Mod/NumINR.js");

const {getProduct, getOrder} =  require("../Models.js");


const Order_Page = async(req, res) =>{


    
    let cook = req.cookies.ID;
    let Auths = await User_Auth(cook);
    if (Auths != null) {

        let Ordersa = await getOrder();
        
        if(Ordersa == [] || Ordersa == null || Ordersa.length < 1){
            
            let dc = {
                In:"Your order Page is Empty",
            }
            res.status(200).render("Order_Page", dc);
            
        }else{
            let Girl = "";
            let Produ = await getProduct();
            for (let g = 0; g < Ordersa.length; g++) {
                let OrderPart = Ordersa[g];
                let LL1 = OrderPart.Products[0];
                let aaaa = "";
                for (let index = 0; index < LL1.length; index++) {
                    const LL = LL1[index];
                    const P_ID = LL.ID;
                    // console.log(P_ID);
                    const Option = LL.Option;
                    for (let gv = 0; gv < Produ.length; gv++) {
                        const product = Produ[gv];
                        if (product._id == P_ID) {
                            aaaa += `<tr>
                                    <td> <a href="/products/${product.URL}">${product.Title}</a></td>
                                    <td>${Option}</td>
                                    <td>Rs. ${NumINR(product.Selling_Price)}</td>
                                </tr>`;
                            break;
                            
                        };
                    };
                };
                Girl += `
                    <div class="Products">
                        <h3 style="margin: 7px 4px;">Order ID: ${OrderPart._id}</h3>
                        <table>
                            <tr style="border-bottom: 1px solid #aaa;">
                                <td style="font-weight: bold;">Products:</td>
                                <td style="font-weight: bold;">Option</td>
                                <td style="font-weight: bold;">Price</td>
                            </tr>
                            ${aaaa}
                            <tr>
                                <td style="font-weight: bold;" colspan="2">Total</td>
                                <td>Rs. ${NumINR(OrderPart.Pricing)}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold;" colspan="2">Current Status</td>
                                <td>${OrderPart.Status}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold; text-align: right;" colspan="2">Contact for any issue</td>
                                <td><a href="https://wa.me/+919749848292">WhatsApp</a></td>
                            </tr>
                        </table>
                    </div>
                `;
            }
            let dc = {
                In:Girl,
            }
            res.status(200).render("Order_Page", dc);

        }




        // res.status(200).render("Order_Page");
    }else{
        res.cookie("ID");
        res.status(200).redirect("/login");
    }









}
module.exports = Order_Page;