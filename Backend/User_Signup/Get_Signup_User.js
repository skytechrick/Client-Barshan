
const Get_Signup_User = async(req, res) => {

    if (req.cookies.ID == undefined) {
        if(true){
        // if(req.cookies.U_ID){

        
            res.cookie("Signup","New", { 
                path:"/",
                secure: false,
                maxAge: 1200000,
                overwirte:true,
                httpOnly: true,
            });
            res.status(200).render("Signup");
        
        }else{
            res.status(200).redirect("http://192.168.0.12/");
        }
    }else{
        res.status(200).redirect("http://192.168.0.12/");
    }
    



}

module.exports = Get_Signup_User;