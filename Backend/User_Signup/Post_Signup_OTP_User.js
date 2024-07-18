

const {getUserProfile} = require("../Models.js");

const Post_Signup_OTP_User = async(req, res) =>{

    let data = await getUserProfile();
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
    if(jk == 1){
        if (req.cookies.Auth_OTP == Men.Auth.Auth_ID && Men.Verified == "No" && req.cookies.Status == "OTP") {
            

            res.status(200).render("Signup_OTP");


        }else{
            res.clearCookie("Signup");
            res.clearCookie("Auth_OTP");
            res.clearCookie("Email");
            res.clearCookie("Status");
            res.status(200).redirect("/signup");
        }

    }else{
        res.clearCookie("Signup");
        res.clearCookie("Auth_OTP");
        res.clearCookie("Email");
        res.clearCookie("Status");
        res.status(200).redirect("/signup");
    }
}

module.exports = Post_Signup_OTP_User;