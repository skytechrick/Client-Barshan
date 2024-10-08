


const User_Auth = require("../User_Auth.js");
const NumINR = require("../Mod/NumINR.js");

const {updateUserProfile} =  require("../Models.js");



const Profile_Update = async(req, res)=>{
    
    let cook = req.cookies.ID;
    let Auths = await User_Auth(cook);
    if (Auths != null) {
        // console.log(req.body);
        let a = req.body.Address;
        let PIN = req.body.PIN;
        await updateUserProfile({_id:Auths._id}, {$set:{Address:a, PIN:PIN}});
        res.status(200).json({Success:"Edited Successfully."});
    }else{ 
        res.cookie("ID");
        res.status(200).json({Success:"1"});
    }


}
module.exports = Profile_Update;