

const User_Auth = require("../User_Auth.js");
const NumINR = require("../Mod/NumINR.js");

const {Products, User_Profile} =  require("../Models.js");


const Cart_Get = async (req, res) => {





    let cook = req.cookies.ID;
    let Auths = await User_Auth(cook);
    if (Auths != null) {

        let Cart = Auths.Cart;
        if (Cart.length >= 1) {
            let z = "";
            for (let index = 0; index < Cart.length; index++) {
                const element1 = Cart[index];

                let data = await Products.find({});
                let d;
                let f = 1;
                for (let sz = 0; sz < data.length; sz++) {
                    const element = data[sz];
                    if(element._id == element1.ID){
                        f = 2;
                        d = element;
                        break;

                    }
                    
                }
                if(f == 2){
                    if (d.Category == "Back Cover Collection") {
                        











                        let a = `
                        <div class="Prod">
                            <div class="Side1">
                                <a href="/products/${d.URL}">
                                    <img src="${d.Images[0]}" alt="Product Image"></div>
                                </a>
                            <div class="Side2">
                                <h1>
                                    <a href="/products/${d.URL}">${d.Title}</a>
                                </h1>
                                <div class="Pricing">
                                    <div class="MRPPPP">MRP: Rs.${NumINR(d.MRP)}</div>
                                    <div class="Sellings">Rs.${NumINR(d.Selling_Price)}</div>
                                </div>
                                <div>
                                    <div  class="sfdassafsaaf">
                                        <label>:<b>Device:</b></label>
                                        <select class="Option_Selected" id="Mobile_Type${index+1}" onchange="Functionnn(${index +1})">
                                            <option name="">-- Select --</option>
                                            <option name="Realme">Realme</option>
                                            <option name="MI_REDMI">MI_REDMI</option>
                                            <option name="iPhone">iPhone</option>
                                            <option name="Samsung">Samsung</option>
                                            <option name="OnePlus">OnePlus</option>
                                            <option name="IQOO">IQOO</option>
                                            <option name="POCO">POCO</option>
                                            </select>
                                        <select  class="Option_Selected" id="Models${index+1}" onchange='document.getElementById("Update_Model${index+1}").style.display = "inline-block";'>
                                            <option name="">-- Select --</option>

                                        </select>


                                        <button id="Update_Model${index+1}" onclick="Update_Model('${d._id}',${index+1})" class="delete_cart delete_cartdsadasd">Update</button>
                                        


                                    </div>
                                    <div class="sfdassafsaaf">
                                        <div>Selected: ${element1.Model}</div>
                                    </div>
                                    
                                    <div class="sfdassafsaaf">
                                        <label>:<b>Type:</b></label>
                                        <select class="Option_Selected" id="Type${index+1}" onchange="Functionnssdasdn(${index +1})">
                                            <option name="">-- Select --</option>
                                            <option name="Skins">Skins</option>
                                            <option name="Cover">Cover</option>
                                            
                                            
                                             


                                        </select>
                                        <select  class="Option_Selected" id="TypeA${index+1}"  onchange='document.getElementById("Update_Skin${index+1}").style.display = "inline-block";'>
                                            <option name="">-- Select --</option>

                                        </select>
                                        
                                        <button id="Update_Skin${index+1}" onclick="Update_Skin('${d._id}',${index+1})" class="delete_cart delete_cartdsadasd">Update</button>
                                        
                                        
                                    </div>
                                    
                                    <div class="sfdassafsaaf">
                                        <div>Selected: ${element1.Skin}</div>
                                    </div>
                                </div>
                                <div>
                                    <button class="delete_cart" id="delete_cart${index+1}" onclick="delete_cart('${d._id}', ${index+1});" type="button">Remove</button>
                                </div>
                            </div>
                        </div>`;
                        z+=a;










                    }else if (d.Category == "Customize Products"){











                        
                        let a = `
                        <div class="Prod">
                            <div class="Side1">
                                <a href="/products/${d.URL}">
                                    <img src="${d.Images[0]}" alt="Product Image"></div>
                                </a>
                            <div class="Side2">
                                <h1>
                                    <a href="/products/${d.URL}">${d.Title}</a>
                                </h1>
                                <div class="Pricing">
                                    <div class="MRPPPP">MRP: Rs.${NumINR(d.MRP)}</div>
                                    <div class="Sellings">Rs.${NumINR(d.Selling_Price)}</div>
                                </div>
                                <div>
                                    <input id="Files1" type="file">
                                    <button onclick="Files_Upload(1);" type="button">Upload</button> 

                                    
                                <div>
                                    <div>Selected file: <a href="/uploaded_image">View Image</a></div>
                                    
                                
                                </div>
                                </div>
                                
                                <div>
                                    <button class="delete_cart" id="delete_cart${index+1}" onclick="delete_cart('${d._id}', ${index+1});" type="button">Remove</button>
                                </div>
                            </div>
                        </div>`;
                        z+=a;


























                    }else{


                        let Op = d.Option;

                        let vvv = "";
                        if (Op.length>=1) {
                            let gg = "";
                            for (let i = 0; i < Op.length; i++) {
                                const element = Op[i];
                                let OP = element;
                                
                                let a = `<option value="${OP}">${OP}</option>`;
                                gg+=a;
                                
                            }
                            let a = `<div>
                                    <label for="Option_Selected">Option:</label>
                                    <select name="Option_Selected" class="Option_Selected" id="Option_Selected${index+1}" onchange='document.getElementById("Update${index+1}").style.display = "inline-block";'>
                                        <option value="">-- Select --</option>
                                        ${gg}
                                    </select>
                                    <button class="Updatea" id="Update${index+1}" onclick="Update('${d._id}', ${index+1});" type="button">Update</button>
                                </div>`;


                            vvv = a;

                            
                        }

                        let DF = vvv;

                        let OPPPP = element1.Option;


                        let a = `
                        <div class="Prod">
                            <div class="Side1">
                                <a href="/products/${d.URL}">
                                    <img src="${d.Images[0]}" alt="Product Image"></div>
                                </a>
                            <div class="Side2">
                                <h1>
                                    <a href="/products/${d.URL}">${d.Title}</a>
                                </h1>
                                <div class="Pricing">
                                    <div class="MRPPPP">MRP: Rs.${NumINR(d.MRP)}</div>
                                    <div class="Sellings">Rs.${NumINR(d.Selling_Price)}</div>
                                </div>
                                ${DF}
                                <div>
                                    <div>Selected Option: ${OPPPP}</div>
                                </div>
                                <div>
                                    <button class="delete_cart" id="delete_cart${index+1}" onclick="delete_cart('${d._id}', ${index+1});" type="button">Remove</button>
                                </div>
                            </div>
                        </div>`;
                        z+=a;
                    };
                };
            };

            
            if (z != "") {
                let a = {
                    Products:z,
                    PROO:`<a id="Check_out" href="/check_out">Check out</a>`,

                }
                res.status(200).render("Cart_Page",a);
                
            }else{
                res.status(200).render("Cart_Page",{
                    Products:"<center>Your Cart is Empty.</center>",
                    PROO:"",
                });
                
            }
            
        }else{
            res.status(200).render("Cart_Page",{
                Products:"<center>Your Cart is Empty.</center>",
                PROO:"",
            });
            
        }        
    }else{
        res.clearCookie("ID");
        res.status(200).redirect("/login");
    }

}
module.exports = Cart_Get;