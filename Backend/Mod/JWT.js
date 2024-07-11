require('dotenv').config();
const jwt = require("jsonwebtoken");

const sig = process.env.ServerSignature;


function Jwt_Create(S) {
    const payload = {
        ID: S.Profile_ID,
        Auth: S.Auth_ID
    };    
    let option = {
        expiresIn: '360h',
        audience: 'Customer',
        issuer: 'Server.AutoGeneration'
    };
    const token = jwt.sign(payload, sig, option);
    return token;

}

function Jwt_verification(token){
    try {
        const aa = jwt.verify(token,sig,{
            audience: 'Customer',
            issuer: 'Server.AutoGeneration'
        })
        return aa;
    } catch (E) {
        return null;
        
    }
}
module.exports = {
    JWT_Create: Jwt_Create,
    JWT_Verify: Jwt_verification
}