

const User_Auth = require("../User_Auth.js");
const NumINR = require("../Mod/NumINR.js");

const {Products, User_Profile} =  require("../Models.js");



const Profile_Page = async(req, res) =>{

    let cook = req.cookies.ID;
    let Auths = await User_Auth(cook);
    if (Auths != null) {
        let a = Auths.Address;
        // console.log(a);
        if (a) {
            
            if (a.length > 10) {
                a = a.replace(/<br>/g, '\n');
                let c = Auths.PIN;

                res.status(200).render("Profile_Page",{Assd:a, PIN:c, Name:Auths.Name, Email:Auths.Email, Mob:Auths.Mobile_Number});
                
            }else{
                res.status(200).render("Profile_Page",{Assd: "", PIN:Auths.PIN, Name:Auths.Name, Email:Auths.Email, Mob:Auths.Mobile_Number});
                
            }
        }else{
            res.status(200).render("Profile_Page",{Assd: "", PIN:Auths.PIN, Name:Auths.Name, Email:Auths.Email, Mob:Auths.Mobile_Number});
            
        }
    }else{ 
        res.clearCookie("ID");
        res.status(200).redirect("/login");
    }


}
module.exports = Profile_Page;