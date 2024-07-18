

const {JWT_Verify} =  require("./Mod/JWT.js");
const {getUserProfile} =  require("./Models.js");

const User_Auth = async(Cook)=>{

    let s = JWT_Verify(Cook);

    if (s == null) {
        return null;
    }else{
        let Profile_ID = s.ID;
        let Auth_ID = s.Auth;
        let All_User = await getUserProfile();
        let l = 2;
        let User;
        for (let index = 0; index < All_User.length; index++) {
            const element = All_User[index];
            if (element._id == Profile_ID) {
                if (element.Logs == Auth_ID) {
                    l = 1;
                    User = element;
                    break;
                }
            }
        }
        
        if (l == 1) {
            
            return User;
            
        }else{
            return null;
        }
    }


}

module.exports = User_Auth;