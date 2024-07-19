

const Auth_Token = require("../Mod/Auth.js");
const Pass_Hash = require("../Mod/PassHas.js");
const OTP = require("../Mod/OTP.js");
const Profile_ID = require("../Mod/User_ID.js");
const {User_Profile} = require("../Models.js");
const nodemailer = require("nodemailer");
const Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'zipbuy01@gmail.com',
        pass: 'xbuo ytyu rgrd xyrd'
    }
});

const Post_Signup_User = async(req,res)=>{
    if (req.cookies.Signup) {
        if(true){
            let cook = req.cookies.Signup;
            
            if (cook === "New") {
                let Users = await User_Profile.find({});
                let Opt = req.body;
                let Name = Opt.Name;
                let Mob = Opt.Mobile_Number;
                let Email = Opt.Email;
                let Create_Password = Opt.Create_Password;
                let Confirm_Password = Opt.Confirm_Password;
                try {
                    Email = Email.trim();
                    Email = Email.toLowerCase();
                } catch (error) {
                    Email = Email;
                }

                function Check_Return(Name, Email, Mob, Create_Password,  Confirm_Password) {
                    

                    let c = {};
                    if (Name == null || Name == undefined || Name == "") {
                        c["Name"] = "Enter correct name.";
                    }else if(Name.length < 3){
                        c["Name"] = "Enter correct name.";
                    }else{
                        
                        // Name.trim();
                        let kl = 2;
                        for (let N = 0; N < Name.length; N++) {
                            const element = Name[N];
                            let g = element.toLowerCase();
                            if ("qwertyuioplkjhgfdsazxcvbnm. ".includes(g)) {
                                kl = 0
                            }else{
                                kl = 1
                                break;
                            }
                        }
                        if (kl == 1) {
                            c["Name"] = "Name can only contain alphabet, space and comma.";
                        }else if(kl==0){
                            c["Name"] = 1;
                        }else{
                            c["Name"] = "Name can only contain alphabet, space and comma.";
                            
                        }
                    }
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
                    if (Mob == null ) {
                        c["Mob"] = "Enter correct mobile number.";
                    }else if(Mob.length != 10 ){
                        c["Mob"] = "Enter correct mobile number.";
                    }else{
                        // console.log(Mob.length);
                        // Mob.trim();
                        let dc = 1;
                        for (let zx = 0; zx < Mob.length; zx++) {
                            const element = (Mob[zx]);
                            if("0123456789".includes(element)){
                                dc = 2;
                            }else{
                                dc = 3;
                                break;
                            }                            
                        }
                        if (dc == 3) {
                            c["Mob"] = "Enter correct mobile number.";
                        }else{
                            c["Mob"] = 1;
                        }
                    }

                    if(Create_Password == null || Confirm_Password == null){
                        c["Con_Pass"] = "Password must be atleast 8 characters.";
                        c["Cre_Pass"] = "Password must be atleast 8 characters.";
                    }else if (Create_Password.length < 8) {
                        c["Cre_Pass"] = "Password must be atleast 8 characters.";
                        c["Con_Pass"] = "Password must be atleast 8 characters.";
                    }else if (Confirm_Password.length < 8) {
                        c["Cre_Pass"] = 1;
                        c["Con_Pass"] = "Password must be atleast 8 characters.";
                    }else if (Create_Password == Confirm_Password) {
                        
                        c["Cre_Pass"] = 1;
                        c["Con_Pass"] = 1;
                    }else{
                        c["Cre_Pass"] = "Password do not match";
                        c["Con_Pass"] = "Password do not match";
                    }

                    return c;
                }

                let cc = Check_Return(Name, Email, Mob, Create_Password, Confirm_Password)
                if (cc.Name == 1 && cc.Email == 1 && cc.Mob == 1 && cc.Cre_Pass == 1 && cc.Con_Pass == 1) {


                    let ll = 1;
                    for (let zx = 0; zx < Users.length; zx++) {
                        const element = Users[zx];
                        
                        if(element.Email == Email){
                            ll = 2;
                            break;
                        };
                    }
                    if (ll == 2) {
                        return res.status(200).json({Success:false,Message:"User already exist."});
                        
                    }else if(ll == 1){
                        let Profile_ID1;
                        while (true) {
                            Profile_ID1 = Profile_ID();
                            let gf = 1;
                            for (let dc = 0; dc < Users.length; dc++) {
                                const element = Users[dc];
                                if (element.User_ID == Profile_ID1) {
                                    gf = 2;
                                    break;
                                }else{
                                    gf = 3;
                                }
                                
                                
                            }
                            if (gf != 2) {
                                break;
                                
                            }
                            
                        }
                        let Auth_Token1 = Auth_Token(32);
                        let OT = OTP();
                        let {Final, X} = await Pass_Hash(Create_Password, Email);
                        
                        let Name1 = Name;
                        let Mobile1 = Mob;
                        let OTP1 = OT;
                        let Email1 = Email;
                        let MAILSENT = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>OTP Verification | ZIPBUY</title><style>body{margin:0;padding:0;font-family:Arial,Helvetica,sans-serif}.container{max-width:600px;width:100%;margin:auto;padding-bottom:10px;box-shadow:0 0 10px #aaa}.container h2{background-color:rgb(103, 187, 255);padding:20px;margin-bottom:0}.container p{padding:20px;margin:0;padding-bottom:0}.OTP{padding:0 10px;display:block;text-align:center;font-size:24px;font-weight:bold}footer{padding:0 20px}.Not{padding:0 20px;color:red}.NSdsf,.YouT{padding:20px}table{padding:0 20px;margin-bottom:20px}table tr td:nth-child(1){font-weight:bold}.name{display:block;padding:10px 0}</style></head><body><div class="container"><h2>OTP Verification | Account Verification | ZIPBUY</h2><p>Hello, dear customer<br><span class="name"><strong>Name: </strong>${Name1}<br><strong>Mobile: </strong>+91 ${Mobile1}</span>Thank you for creating Account on <strong>ZIPBUY</strong>. To confirm the creation of your account, please enter this One Time Password (OTP).</p><div class="YouT">Your One Time Password is:</div><hr><div class="OTP">${OTP1}</div><hr><div class="Not"><strong>NOTE:</strong> This is very confidential. Do not share this email with anyone.</div><div class="NSdsf">If you did not create this account, please ignore this email and avoid sharing this email and OTP. Contact us directly at <a href="https://zipbuy.in/contact-us">Link</a></div><table><tr><td>Website:</td><td><a href="https://zipbuy.in">Link</a></td></tr><tr><td>Complaint:</td><td><a href="https://zipbuy.in/contact">Link</a></td></tr></table><footer>Thank you,<br>Team GSB</footer></div></body></html>`;
                        
                        let database = {
                            _id:Profile_ID1,
                            Logs:"",
                            Name:Name,
                            Email:Email,
                            Mobile_Number:Mob,
                            Password:Final,
                            Auth:{
                                Auth_ID:Auth_Token1,
                                OTP:OT,
                            },
                            Ban:"No",
                            Verified:"No",
                            Orders:[],
                            Cart:[],
                            Address:[],
                            PIN:"",
                            
                        }
                        
                        let xc = User_Profile(database);
                        await xc.save().then(()=>{



                            const Mail_Option = {
                                from: 'Congratulations <account@zipbuy.in>',
                                to: Email1,
                                subject: 'Email verification | OTP | ZIPBUY', 
                                html: MAILSENT,
                            };
                            Transporter.sendMail(Mail_Option);

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
                            let send = {
                                Success: true,
                                OBJ: cc,
                            }
                            res.status(200).json(send);

                            setTimeout(async () => {
                                let d = await User_Profile.find({});
                                for (let a = 0; a < d.length; a++) {
                                    const element = d[a];
                                    if(element._id == Profile_ID1){
                                        if(element.Verified == "No"){
                                            await User_Profile.deleteOne({_id: element._id});
                                        }
                                        break;
                                    }
                                }
                            }, 1200000);
                        });
                    }
                }else{
                    let send = {
                        Success: false,
                        OBJ: cc,
                    }
                    return res.status(200).json(send);
                };
            }else{
                return res.status(200).json({Message:"Unauthorised Access"});
            };
        }else{
            return res.status(200).redirect("https://zipbuy.in/");
        };
    }else{
        
        return res.status(200).json({Message:"Unauthorised Access"});
        // return res.status(200).json({Warning:"Unauthorised Access"});
    };
};
module.exports = Post_Signup_User;