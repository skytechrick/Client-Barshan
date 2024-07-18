




const Get_Login = async(req, res) => {

    if (req.cookies.ID == undefined) {
        if(true){
        // if(req.cookies.U_ID){

        
            res.cookie("Login","Yes", { 
                path:"/",
                secure: false,
                maxAge: 1200000,
                overwirte:true,
                httpOnly: true,
            });
            res.status(200).render("Login");
        
        }else{
            res.status(200).redirect("http://192.168.0.12/");
        }
    }else{
        res.status(200).redirect("http://192.168.0.12/");
    }
    




}
module.exports = Get_Login;