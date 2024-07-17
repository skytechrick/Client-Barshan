
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
            res.status(200).redirect("http://lznqxtn8-80.inc1.devtunnels.ms/");
        }
    }else{
        res.status(200).redirect("http://lznqxtn8-80.inc1.devtunnels.ms/");
    }
    



}

module.exports = Get_Signup_User;