
const User_Auth = require("../User_Auth.js");
const NumINR = require("../Mod/NumINR.js");

const {getProduct,insertorder, updateUserProfile, getOrder} =  require("../Models.js");



const Placed_Order = async(req, res) =>{
    
    let cook = req.cookies.ID;
    let Auths = await User_Auth(cook);
    if (Auths != null) {
        if(Auths.Cart == [] || Auths.Cart.length <1){
            res.status(200).json({Success:"Logout"});
        }else{
            let a = req.body.Placed_Type;
            function ORDER_ID() {
                const character = "1234567890";
                let name = "";
                let varrr = 1;
                let getRandom = 0;
                while (varrr <= 17){
                    getRandom = Math.floor(Math.random() * (character.length-1));
                    name = name + character[getRandom];
                    varrr = varrr + 1;
                };
                return name;
            };

            if(a == 2){

                
                let aa = await getOrder();
                let a;
                while (true) {
                    a = ORDER_ID();
                    let op = 1;
                    for (let x = 0; x < aa.length; x++) {
                        const element = aa[x];
                        if (element._id == a) {
                            op = 2;
                            break;                            
                        }
                    }
                    if (op == 1) {
                        break;
                    }
                }
                Produ = await getProduct();
                let Pricea = 0;
                for (let gh = 0; gh < Auths.Cart.length; gh++) {
                    const element1 = Auths.Cart[gh];
                    let ID = element1.ID;
                    for (let na = 0; na < Produ.length; na++) {
                        const element2 = Produ[na];
                        if (element2._id == ID) {
                            Pricea+=Number(element2.Selling_Price);
                            break;
                        }
                    }
                }
                let ORDER_IDa = a;
                let Add = {
                    _id:ORDER_IDa,
                    Name:Auths.Name,
                    PIN:Auths.PIN,
                    Mobile_Number:Auths.Mobile_Number,
                    Address:Auths.Address,
                    Products:[Auths.Cart],
                    Pricing:Pricea,
                    Type:"Pay on delivery",
                    Confirmed:"Yes",
                    Date:Date(),
                    Status:"Pending",
                }
                await insertorder(Add);
                
                let fv = Auths.Orders;
                fv.push(Add);
                await updateUserProfile({_id:Auths._id},{$set:{Cart:[],Orders:fv}});
                const Message = `https://zipbuy.in/order`;
                res.status(200).json({Success:"Paid", Link:Message});
                
            }else{
                
                let aa = await getOrder();
                let a;
                while (true) {
                    a = ORDER_ID();
                    let op = 1;
                    for (let x = 0; x < aa.length; x++) {
                        const element = aa[x];
                        if (element._id == a) {
                            op = 2;
                            break;                            
                        }
                    }
                    if (op == 1) {
                        break;
                    }
                }
                Produ = await getProduct();
                let Pricea = 0;
                for (let gh = 0; gh < Auths.Cart.length; gh++) {
                    const element1 = Auths.Cart[gh];
                    let ID = element1.ID;
                    for (let na = 0; na < Produ.length; na++) {
                        const element2 = Produ[na];
                        if (element2._id == ID) {
                            Pricea+=Number(element2.Selling_Price);
                            break;
                        }
                    }
                }
                let ORDER_IDa = a;
                let Add = {
                    _id:ORDER_IDa,
                    Name:Auths.Name,
                    PIN:Auths.PIN,
                    Mobile_Number:Auths.Mobile_Number,
                    Address:Auths.Address,
                    Products:[Auths.Cart],
                    Pricing:Pricea,
                    Type:"Pay on delivery",
                    Confirmed:"Yes",
                    Date:Date(),
                    Status:"Payment Pending",
                };
                
                await insertorder(Add);
                let fv = Auths.Orders;
                fv.push(Add)
                await updateUserProfile({_id:Auths._id},{$set:{Cart:[],Orders:fv}});
                let Price = Pricea;
                const Message = `https://api.whatsapp.com/send?phone=919749848292&text=*Hello%2C*%20Sir%0AMy%20Name%20is%2C%20${Auths.Name}%0AI%20have%20placed%20order%20Successfully.%20%F0%9F%A4%A9%0AThis%20is%20my%20order%20ID%3A%20${ORDER_IDa}%0AAnd%20the%20amount%20is%20Rs%3A%20${Price}%0A%0A%0APlease%20share%20me%20the%20QR%20code%20or%20UPI%20Number%20for%20payment.%0AThank%20you%20for%20considering%20my%20order`;
                res.status(200).json({Success:"Yes", Link:Message});
            }
        }
    }else{
        res.cookie("ID");
        res.status(200).json({Success:"Logout"});
    }
}
module.exports = Placed_Order;