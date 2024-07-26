


const User_Auth = require("../User_Auth.js");
const NumINR = require("../Mod/NumINR.js");

const fs = require("fs");
const path = require("path");

const {Products, User_Profile} =  require("../Models.js");


const Cart_Update = async(req, res) =>{
    async function DeleteImg(A) {
        let data = A;
        let filePath = path.join(__dirname, '../../Frontend/Uploaded_Image', data);
        
        fs.unlinkSync(filePath, (err) => {
            if (err) {
                console.log(`Error deleting file ${data}: ${err.message}`);
            } else {
                console.log(`File ${data} deleted successfully`);
            }
        });
        
    }

    let cook = req.cookies.ID;
    let Auths = await User_Auth(cook);
    if (Auths != null) {
        if(req.body.Type == 'Update'){
            let ID = req.body.ID;
            let dd = await Products.find({});

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
                await User_Profile.updateOne({_id:Auths._id},{$set:{Cart:TY}}).then(()=>{

                    res.status(200).json({Success:"Cart Updated successfully."});
                }).catch(()=>{
                    
                    res.status(200).json({Success:"Server Error."});
                });

                
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            }else{
                res.status(200).json({Success:"Product not found."});
            }
            
        }else if(req.body.Type == 'Delete'){
            let ID = req.body.ID;
            let dd = await Products.find({});

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
                        if (element.Option.length > 5) {
                            await DeleteImg(element.Filesss);
                        }
                    }else{
                        TY.push(element);
                    }
                    
                }
                await User_Profile.updateOne({_id:Auths._id},{$set:{Cart:TY}}).then(()=>{

                    res.status(200).json({Success:"Removed successfully."});
                }).catch(()=>{
                    
                    res.status(200).json({Success:"Server Error."});
                })

                
            }else{
                res.status(200).json({Success:"Product not found."});
            }
            
        }else if(req.body.Type == 'Model'){






            











            let ID = req.body.ID;
            let dd = await Products.find({});

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
                await User_Profile.updateOne({_id:Auths._id},{$set:{Cart:TY}}).then(()=>{

                    res.status(200).json({Success:"Cart Updated successfully."});
                }).catch(()=>{
                    
                    res.status(200).json({Success:"Server Error."});
                })

                
            }else{
                res.status(200).json({Success:"Product not found."});
            }












            
        }else if(req.body.Type == 'Skin'){




            let ID = req.body.ID;
            let dd = await Products.find({});

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
                await User_Profile.updateOne({_id:Auths._id},{$set:{Cart:TY}}).then(()=>{

                    res.status(200).json({Success:"Cart Updated successfully."});
                }).catch(()=>{
                    
                    res.status(200).json({Success:"Server Error."});
                })

                
            }else{
                res.status(200).json({Success:"Product not found."});
            }
        }else if(req.body.Type == 'Files'){
            


            

            let ID = req.body.ID;
            
            // console.log(ID);
            let dd = await Products.find({});
            
            let ds = new Object(req.files);
            let IMM = [];
            for (let add = 0; add < 5; add++) {
                let a = `File_${add+1}`;
                if (ds[a]) {
                    
                    // console.log();
                    IMM.push(ds[a][0].filename);

                }
                
            }
            // console.log(IMM[0]);



            












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
                        if (element.Option.length < 5) {
                            
                            TY.push({
                                ID:element.ID,
                                Filesss:IMM[0],
                                Option:"Image Attached",
                            });
                        }else{
                            
                            await DeleteImg(element.Filesss);
                            TY.push({
                                ID:element.ID,
                                Filesss:IMM[0],
                                Option:"Image Attached",
                            });
                        }
                            

                        
                        
                    }else{
                        TY.push(element);
                    }
                    
                }
                await User_Profile.updateOne({_id:Auths._id},{$set:{Cart:TY}}).then(()=>{

                    res.status(200).json({Success:"Cart Updated successfully."});
                }).catch(()=>{
                    
                    res.status(200).json({Success:"Server Error."});
                })

                
            }else{
                res.status(200).json({Success:"Product not found."});
            }



        }
        
    }else{ 
        res.clearCookie("ID");
        res.status(200).json({Success:"1"});
    }
}
module.exports = Cart_Update;