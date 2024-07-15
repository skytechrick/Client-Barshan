require('dotenv').config();
const Auth_Token = require("../Mod/Auth.js");
const Pass_Hash = require("../Mod/PassHas.js");
const {JWT_Create} = require("../Mod/JWT.js");
const bcrypt = require('bcrypt');
const OTP = require("../Mod/OTP.js");
const {User_Profile} = require("../Models.js");
const nodemailer = require("nodemailer");
const Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'zipbuy01@gmail.com',
        pass: 'xbuo ytyu rgrd xyrd'
    }
});


const Post_Login = async(req, res) =>{
    let BODY = req.body;

    let SA = BODY.Email;
    try {
        SA = SA.trim();
        SA = SA.toLowerCase();
    } catch (error) {
        SA = SA;
    }

    if(req.cookies.Login == "Yes"){
        if(true){
            if(BODY.Mess == "Hello developer/hacker"){



                function Check(Email, Password) {
                    let c = {};
                    if (Email == null || Email == undefined || Email == "") {
                        c["Email"] = "Enter correct Email address";
                    }else if(Email.length < 6){
                        c["Email"] = "Enter correct Email address";
                    
                    }else{
                        
                        // Email.trim();
                        let xc = 0;
                        let dc = 1;
                        for (let Ema = 0; Ema < Email.length; Ema++) {
                            const element = Email[Ema];
                            if ("0123456789qwertyuioplkjhgfdsazxcvbnm.@".includes(element)) {
                                if (element == "@" && dc == 1) {
                                    dc = 2;
                                    xc = 4;
                                }
                                if(dc == 2){
                                    if(element == "."){
                                        xc = 8;
                                        break;
                                    }
                                }       
                            }else{
                                xc = 1;
                                break;
                            }
                        }
                        if (xc == 8) {
                            c["Email"] = 1;
                            
                        }else{
                            c["Email"] = "Enter correct Email Address.";
                        }
                    }

                    // console.log(Password)
                    if(Password == null || Password == undefined){
                        c["Password"] = "Password must be atleast 8 characters.";
                    }else if (Password.length < 8) {
                        c["Password"] = "Password must be atleast 8 characters.";
                    }else if (Password.length >=8) {
                        c["Password"] = 1;
                        
                    }else{
                        c["Password"] = "Password must be atleast 8 characters.";
                    }
                    return c;
                    
                }

                let D = Check(SA, req.body.Password);

                if(D.Email == 1 && D.Password == 1){

                    let d = await User_Profile.findOne({Email:SA});
                    if (d == null) {
                        res.status(200).json({Success:false, Message:"You don't have an account."});                        
                    }else{
                        let {Final, X} = await Pass_Hash(BODY.Password, SA)
                        const match = await bcrypt.compare(X, d.Password);

                        if(match == true){
                            if (d.Verified == "Yes") {
                                
                            
                                let Xa = Auth_Token(31);
                                let a = {
                                    Profile_ID: d._id,
                                    Auth_ID: Xa,
                                }
                                await User_Profile.updateOne({_id:d._id},{$set:{Logs:Xa}}).then(()=>{
                                    
                                    
                                    res.cookie("ID",JWT_Create(a), { 
                                        path:"/",
                                        secure: false,
                                        maxAge: 130000000,
                                        overwirte:true,
                                        httpOnly: true,
                                    });
                                    res.clearCookie("Login");
                                    res.status(200).json({Success:true, Message:"Login Successfully"});
                                });
                            
                            }else{

                                let Auth_Token1 = Auth_Token(32);
                                let OT = OTP();
                                let Name1 = d.Name;
                                let Mobile1 = d.Mobile_Number;
                                let OTP1 = OT;
                                let Email1 = SA;
                                let MAILSENT = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>OTP Verification | ZIPBUY</title><style>body{margin:0;padding:0;font-family:Arial,Helvetica,sans-serif}.container{max-width:600px;width:100%;margin:auto;padding-bottom:10px;box-shadow:0 0 10px #aaa}.container h2{background-color:rgb(103, 187, 255);padding:20px;margin-bottom:0}.container p{padding:20px;margin:0;padding-bottom:0}.OTP{padding:0 10px;display:block;text-align:center;font-size:24px;font-weight:bold}footer{padding:0 20px}.Not{padding:0 20px;color:red}.NSdsf,.YouT{padding:20px}table{padding:0 20px;margin-bottom:20px}table tr td:nth-child(1){font-weight:bold}.name{display:block;padding:10px 0}</style></head><body><div class="container"><h2>OTP Verification | Account Verification | ZIPBUY</h2><p>Hello, dear customer<br><span class="name"><strong>Name: </strong>${Name1}<br><strong>Mobile: </strong>+91 ${Mobile1}</span>Thank you for creating Account on <strong>ZIPBUY</strong>. To confirm the creation of your account, please enter this One Time Password (OTP).</p><div class="YouT">Your One Time Password is:</div><hr><div class="OTP">${OTP1}</div><hr><div class="Not"><strong>NOTE:</strong> This is very confidential. Do not share this email with anyone.</div><div class="NSdsf">If you did not create this account, please ignore this email and avoid sharing this email and OTP. Contact us directly at <a href="http://192.168.0.44/contact-us">Link</a></div><table><tr><td>Website:</td><td><a href="http://192.168.0.44">Link</a></td></tr><tr><td>Complaint:</td><td><a href="http://192.168.0.44/contact">Link</a></td></tr></table><footer>Thank you,<br>Team GSB</footer></div></body></html>`;
                                


                                const Mail_Option = {
                                    from: 'Congratulations <zipbuy01@gmail.com>',
                                    to: SA,
                                    subject: 'Email verification | OTP | ZIPBUY', 
                                    html: MAILSENT,
                                };
                                Transporter.sendMail(Mail_Option);

                                await User_Profile.updateOne({_id:d._id},{Auth:{
                                    Auth_ID:Auth_Token1,
                                    OTP:OTP1,
                                }})
                                res.cookie("Auth_OTP", Auth_Token1, { 
                                    path:"/",
                                    secure:   false,
                                    maxAge:   1200000,
                                    overwrite: true,
                                    httpOnly:  true,
                                });
                                res.cookie("Email", Email1, { 
                                    path:"/",
                                    secure:   false,
                                    maxAge:   1200000,
                                    overwrite: true,
                                    httpOnly:  true,
                                });
                                res.cookie("Status","OTP", { 
                                    path:"/",
                                    secure:   false,
                                    maxAge:   1200000,
                                    overwrite: true,
                                    httpOnly:  true,
                                });
                                res.clearCookie("Signup");
                                res.clearCookie("Login");
                                res.status(200).json({Success:false, Message:"OTP"});
                                setTimeout(async () => {
                                    let d = await User_Profile.find({});
                                    for (let a = 0; a < d.length; a++) {
                                        const element = d[a];
                                        if(element._id == d._id){
                                            if(element.Verified == "No"){
                                                await User_Profile.deleteOne({_id: element._id});
                                            }
                                            break;
                                        }
                                    }
                                }, 1200000);



                                
                            }
                        }else{
                            res.status(200).json({Success:false, Message:"Wrong Password"});
                            
                        }
                    }

                }else{
                    res.status(200).json({Success:false, Message:"A",OB:D});



                }


                
                
                
                
                
                
                


            }else{
                res.status(200).json({Success:false,Message:"Unauthorized Access"});
            }
        }else{
            res.status(200).json({Success:false,Message:"Unauthorized Access"});
        }
    }else{
        res.status(200).json({Success:false,Message:"Unauthorized Access"});
    }

}


module.exports = Post_Login;