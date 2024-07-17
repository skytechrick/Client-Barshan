



const User_Auth = require("../User_Auth.js");

const {Products, User_Profile} =  require("../Models.js");

const add_to_cart = async (req, res) =>{
    
    
    let cook = req.cookies.ID;
    let Auths = await User_Auth(cook);
    if (Auths != null) {
        let AllProducts = await Products.find({});
        let H = 2;
        let element;
        let lett = "";
        for (let i = 0; i < AllProducts.length; i++) {
            element = AllProducts[i];
            let P_ID = req.body.ID;
            if (element._id == P_ID) {
                lett = element.Category;
                H = 1;   
                break;
            }
            
        }
        if(H == 1){
            
            if (lett == "Back Cover Collection") {
                            

                // console.log(Auths);

                let a = [];
                a.push({ID:element._id, Option:"-", Model:"-",Skin:"-"})
                
                

                await User_Profile.updateOne({_id:Auths._id},{$set:{
                    Cart:a,
                }}).then(()=>{
                    res.status(200).json({Success:1});
                }).catch(e=>{
                    res.status(200).json({Success:0});
                    
                });
            }else{
                // console.log(Auths);

                let a = [];

                a.push({ID:element._id, Option:"-"})
                

                
                

                await User_Profile.updateOne({_id:Auths._id},{$set:{
                    Cart:a,
                }}).then(()=>{
                    res.status(200).json({Success:1});
                }).catch(e=>{
                    res.status(200).json({Success:0});
                    
                });

            }
        }else{
            res.status(200).json({Success:0});
        }
        
        
        
        
        
    }else{
        res.clearCookie("ID");
        // res.status(200).json({Success:false});
        res.status(200).json({Success:"332a"});
    }

}
module.exports = add_to_cart;