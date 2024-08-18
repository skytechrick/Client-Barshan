
const User_Auth = require("./User_Auth.js");


const t = async (req, res)=>{
    // res.status(200).render("TandC");
    
    let cook = req.cookies.ID;
    let Auths = await User_Auth(cook);

    if (Auths != null) {
        let Login = `
            <div id="CatM">
                <a href="/order">Order</a>
            </div>
            <div id="INNSTSTR6">
                <a href="/cart">Cart</a>
            </div>
            <div id="INNSTSTR7">
                <a href="/logout">Logout</a>
            </div>
            `;
        res.status(200).render("TandC",{NAV: Login, Script1:"HomeLog"});
        
    }else{ 
        let a = `
        <div id="INNSTSTR6">
        <a href="/login">Login</a>
        </div>`;
        res.clearCookie("ID");
        res.status(200).render("TandC",{NAV: a, Script1:"Home"});

    }
}

module.exports = t;