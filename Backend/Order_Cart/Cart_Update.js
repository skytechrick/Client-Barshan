


const User_Auth = require("../User_Auth.js");
const NumINR = require("../Mod/NumINR.js");

const {getProduct, updateUserProfile} =  require("../Models.js");


const Cart_Update = async(req, res) =>{


    let cook = req.cookies.ID;
    let Auths = await User_Auth(cook);
    if (Auths != null) {
        if(req.body.Type == 'Update'){
            let ID = req.body.ID;
            let dd = await getProduct();

            let kl = 0;
            let element1;
            for (let l = 0; l < dd.length; l++) {
                element1 = dd[l];
                if (element1._id == ID) {
                    kl = 1;
                    break;
                    
                }
                
            }
































            if (kl == 1) {



                    
                let Cart = Auths.Cart;
                let TY=[];
                for (let q = 0; q < Cart.length; q++) {
                    const element = Cart[q];
                    if (ID == element.ID) {
                        TY.push({
                            ID:ID,
                            Option:req.body.Selected,
                        });
                        
                    }else{
                        TY.push(element);
                    }
                    
                }
                await updateUserProfile({_id:Auths._id},{$set:{Cart:TY}})

                res.status(200).json({Success:"Cart Updated successfully."});
                

                
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            }else{
                res.status(200).json({Success:"Product not found."});
            }
            
        }else if(req.body.Type == 'Delete'){
            let ID = req.body.ID;
            let dd = await getProduct();

            let element1;
            let kl = 0;
            for (let l = 0; l < dd.length; l++) {
                element1 = dd[l];
                if (element1._id == ID) {
                    kl = 1;
                    break;
                    
                }
                
            }
            if (kl == 1) {
                let Cart = Auths.Cart;
                let TY=[];
                for (let q = 0; q < Cart.length; q++) {
                    const element = Cart[q];
                    if (ID == element.ID) {
                        
                        
                    }else{
                        TY.push(element);
                    }
                    
                }
                await updateUserProfile({_id:Auths._id},{$set:{Cart:TY}})

                res.status(200).json({Success:"Removed successfully."});

                
            }else{
                res.status(200).json({Success:"Product not found."});
            }
            
        }else if(req.body.Type == 'Model'){






            











            let ID = req.body.ID;
            let dd = await getProduct();

            let element1;
            let kl = 0;
            for (let l = 0; l < dd.length; l++) {
                element1 = dd[l];
                if (element1._id == ID) {
                    kl = 1;
                    break;
                    
                }
                
            }
            if (kl == 1) {
                let Cart = Auths.Cart;
                let TY=[];
                for (let q = 0; q < Cart.length; q++) {
                    const element = Cart[q];
                    if (ID == element.ID) {
                        TY.push({
                            ID:element.ID,
                            Model:req.body.Model,
                            Skin:element.Skin,
                            Option:req.body.Model + " | " + element.Skin,
                        });

                        
                        
                    }else{
                        TY.push(element);
                    }
                    
                }
                await updateUserProfile({_id:Auths._id},{$set:{Cart:TY}})

                res.status(200).json({Success:"Cart Updated successfully."});
                       
            }else{
                res.status(200).json({Success:"Product not found."});
            }












            
        }else if(req.body.Type == 'Skin'){



            let ID = req.body.ID;
            let dd = await getProduct();

            let element1;
            let kl = 0;
            for (let l = 0; l < dd.length; l++) {
                element1 = dd[l];
                if (element1._id == ID) {
                    kl = 1;
                    break;
                    
                }
                
            }
            if (kl == 1) {
                let Cart = Auths.Cart;
                let TY=[];
                for (let q = 0; q < Cart.length; q++) {
                    const element = Cart[q];
                    if (ID == element.ID) {
                        TY.push({
                            ID:element.ID,
                            Model:element.Model,
                            Skin:req.body.Skin,
                            Option:element.Model + " | " + req.body.Skin,
                        });

                        
                        
                    }else{
                        TY.push(element);
                    }
                    
                }
                await updateUserProfile({_id:Auths._id},{$set:{Cart:TY}})

                res.status(200).json({Success:"Cart Updated successfully."});

                
            }else{
                res.status(200).json({Success:"Product not found."});
            }
        }
        
    }else{ 
        res.cookie("ID");
        res.status(200).json({Success:"1"});
    }
}
module.exports = Cart_Update;