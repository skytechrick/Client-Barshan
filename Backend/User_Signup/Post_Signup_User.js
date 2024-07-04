

const Auth_Token = require("../Mod/Auth.js");
const Pass_Hash = require("../Mod/PassHas.js");

// console.log();
const Post_Signup_User = async(req,res)=>{


    // let cook = req.cookies;
    // console.log(req.body);
    if (req.cookies.Signup) {
        if(true){
            let cook = req.cookies.Signup;
            
            if (cook === "New") {
                console.log(req.body);
                
                let Opt = req.body;
                let Name = Opt.Name;
                Name.trim();
                let Email = Opt.Email;
                Email.trim();
                let Mob = Opt.Mobile_Number;
                Mob.trim();
                let Create_Password = Opt.Create_Password;
                Create_Password = Create_Password.trim();
                let Confirm_Password = Opt.Confirm_Password;
                Confirm_Password.trim();
                function Check_Return(Name, Email, Mob, Create_Password,  Confirm_Password) {
                    

                    let c = {};
                    if (Name.length < 3 || Name == null || Name == undefined || Name == "") {
                        c["Name"] = "Enter correct name.";
                    }else{
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
                        }else{
                            c["Name"] = 1;
                        }
                    }
                    if (Email.length < 6 || Email == null || Email == undefined || Email == "") {
                        c["Name"] = "Enter correct Email address";
                    }else{
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
                    if (Mob.length != 10) {
                        c["Mob"] = "Enter correct mobile number.";
                    }else{
                        // console.log(Mob.length);
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

                    // console.log(Create_Password +" "+ Confirm_Password);
                    
                    if (Create_Password.length < 8) {
                        c["Cre_Pass"] = "Password must be atleast 8 characters.";
                        c["Con_Pass"] = "";
                        
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
                    




                    let Auth_Token1 = Auth_Token(32);
                    let P = await Pass_Hash(Create_Password, Email);

                    let database = {
                        User_ID:"",
                        Name:Name,
                        Email:Email,
                        Mobile_Number:Mob,
                        Password:P,
                        Auth:{
                            Auth_ID:Auth_Token1,
                            OTP:"",
                        }
                        
                    }

                    res.cookie("Status","OTP", { 
                        path:"/",
                        secure: false,
                        maxAge: 60000,
                        overwrite:true,
                        httpOnly: true,
                    });
                    res.cookie("Auth",Auth_Token1, { 
                        path:"/",
                        secure: false,
                        maxAge: 60000,
                        overwrite:true,
                        httpOnly: true,
                    });
                    res.clearCookie("Signup");
                    let send = {
                        Success: true,
                        Ob: cc,
                    }
                    res.status(200).json(send);
                }else{
                    let send = {
                        Success: false,
                        Ob: cc,
                    }
                    res.status(200).json(send);
                };
            }else{
                res.status(200).json({Warning:"Unauthorised Access"});
            };
        }else{
            res.status(200).redirect("http://192.168.68.57:81/");
        };
    }else{
        res.status(200).json({Warning:"Unauthorised Access"});
    };
};
module.exports = Post_Signup_User;