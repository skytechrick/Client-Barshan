


const User_Auth = require("../User_Auth.js");
const NumINR = require("../Mod/NumINR.js");

const {Products, User_Profile, Orders} =  require("../Models.js");


const a = async (req, res) =>{
    let pp = req.body.ID;
    // console.log(pp);
    let p1p = req.body.Status;
    // console.log(p1p);
    let array = await User_Profile.find({});
    for (let index = 0; index < array.length; index++) {
        let nett = [];
        const PerUser = array[index];
        const OrdersUser = PerUser.Orders;
        let tup = 0;
        if (OrdersUser.length > 0) {
            for (let op = 0; op < OrdersUser.length; op++) {
                const element = OrdersUser[op];
                if (element._id == pp) {
                    
                    tup = 1;
                    let dc = element;
                    dc["Status"] = p1p;
                    nett.push(dc);
                    // break;
                }else{
                    nett.push(OrdersUser);

                }
                
            }            
        }
        if (tup == 1) {
            await User_Profile.updateOne({_id:PerUser._id},{
                $set:{
                    Orders: nett
                }
            })
            break;
                        
        }
        
    }
    
    
    // await User_Profile.updateOne({_id:PerUser._id},{
    //     $set:{
        //         Orders:
    //     }
    // });
    


    await Orders.updateOne({_id:pp},{$set:{
        Status:p1p,
    }});
    res.status(200).redirect("/Dashboard_Product/Ordersafsdfgedtffgikhweopfhe324idsgfdsgfjkdsfgdsuigfdsgoriy384ty8dfgfdgdfgfd");


}
module.exports = a;