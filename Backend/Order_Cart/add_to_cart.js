

const User_Auth = require("../User_Auth.js");

const {getProduct, updateUserProfile} =  require("../Models.js");

const add_to_cart = async (req, res) =>{
    
    
    let cook = req.cookies.ID;
    let Auths = await User_Auth(cook);
    if (Auths != null) {
        let AllProducts = await getProduct();
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

                let a = Auths.Cart;
                if (a.length <1) {
                    a =[{ID:element._id, Option:"-", Model:"-",Skin:"-"}];
                    
                }else{
                    // a.push({ID:element._id})
                    a.push({ID:element._id, Option:"-", Model:"-",Skin:"-"})
                }
                
                

                await updateUserProfile({_id:Auths._id},{$set:{
                    Cart:a,
                }})
                res.status(200).json({Success:1});
                
            }else{
                // console.log(Auths);

                let a = Auths.Cart;
                if (a.length <1) {
                    a =[{ID:element._id, Option:"-"}];
                    
                }else{
                    // a.push({ID:element._id})
                    a.push({ID:element._id, Option:"-"})
                }
                
                

                await updateUserProfile({_id:Auths._id},{$set:{
                    Cart:a,
                }})
                res.status(200).json({Success:1});
                

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