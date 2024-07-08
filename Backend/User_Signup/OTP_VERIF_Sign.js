


const {User_Profile} = require("../Models.js");


const OTP_VERIF_Sign = async (req, res) =>{




    let data = await User_Profile.find({});
    let jk = 0;
    let Men;
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (element.Email == req.cookies.Email) {
            jk = 1;
            Men = element;
            break;

        }

    }
    if (jk == 1) {
        if (req.cookies.Auth_OTP == Men.Auth.Auth_ID && Men.Verified == "No" && req.cookies.Status == "OTP" && req.body.Ver == "Yes") {
            

            let OTP = req.body.OTP; 

            if(Men.Auth.OTP == OTP){


                
                await User_Profile.updateOne({Email:Men.Email},{$set:{Auth:{Auth_ID:"",OTP:""},Verified:"Yes"}});
                res.status(200).json({Success:true,Message:"OTP Verified"});
            }else{
                res.status(200).json({Success:false,Message:"Wrong OTP"});
            }

            




        } else {
            res.clearCookie("Signup");
            res.clearCookie("Auth_OTP");
            res.clearCookie("Email");
            res.clearCookie("Status");
            res.status(200).redirect("/signup");
        }

    } else {
        res.clearCookie("Signup");
        res.clearCookie("Auth_OTP");
        res.clearCookie("Email");
        res.clearCookie("Status");
        res.status(200).redirect("/signup");
    }

}

module.exports = OTP_VERIF_Sign;