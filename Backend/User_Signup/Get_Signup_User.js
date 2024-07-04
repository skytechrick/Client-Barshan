
const Get_Signup_User = async(req, res) => {

    if (req.cookies.U_ID != undefined) {
        if(true){
        // if(req.cookies.U_ID){

        
            res.cookie("Signup","New", { 
                path:"/",
                secure: false,
                maxAge: 120000,
                overwirte:true,
                httpOnly: true,
            });
            res.status(200).render("Signup");
        
        }else{
            res.status(200).redirect("http://192.168.68.57:81/");
        }
    }else{
        res.status(200).redirect("http://192.168.68.57:81/");
    }
    



}

module.exports = Get_Signup_User;