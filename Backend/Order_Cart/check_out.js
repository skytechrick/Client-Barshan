
const User_Auth = require("../User_Auth.js");
const NumINR = require("../Mod/NumINR.js");

const {Products, User_Profile} =  require("../Models.js");


const check_out = async (req, res) =>{

    

    let cook = req.cookies.ID;
    let Auths = await User_Auth(cook);
    if (Auths != null) {
        if(Auths.Address.length > 10){

            res.status(200).render("CheckOut_Page.pug");

            
        }else{
            res.status(200).redirect("/profile");
        }
    }else{
        res.cookie("ID");
        res.status(200).redirect("/login");
    }

}
module.exports = check_out;