const Realme = ["Realme", "Realme 2", "Realme 2 Pro", "Realme 3", "Realme 3 Pro", "Realme 3i", "Realme 5", "Realme 5 Pro", "Realme 5i", "Realme 5s", "Realme 6", "Realme 6 Pro", "Realme 6i", "Realme 6s", "Realme 7", "Realme 7 Pro", "Realme 7i", "Realme 8", "Realme 8 Pro", "Realme 9 5g", "Realme 9 Pro 5g", "Realme 9i", "Realme 9i 5g", "Realme 10", "Realme 10 5g", "Realme 10 Pro 5g", "Realme 10 Pro plus 5g", "Realme 11 5g", "Realme 11 Plus 5g", "Realme 11 Pro Plus 5g", "Realme 11X 5g", "Realme 12 5g", "Realme 12 Pro 5g", "Realme 12 Pro Plus 5g", "Realme XT", "Realme X7 Pro", "Realme X7 Max", "Realme X3", "Realme X2", "Realme X2 Pro"];
const MI_REDMI = ["Mi","Mi 10", "Redmi 10", "Redmi Note 10 Pro", "Redmi Note 10", "Redmi Note 10 Pro Max", "Redmi 9 Power", "Redmi Note 9 Pro Max", "Redmi Note 9 Pro", "Redmi Note 8T", "Xiaomi Redmi Note 8 Pro", "Xiaomi Redmi Note 8"];
const iPhone = ["iPhone","iPhone 11", "iPhone 11 Pro", "iPhone 11 Pro Max", "iPhone 12", "iPhone 12 Pro", "iPhone 12 Pro Max", "iPhone 13", "iPhone 13 Pro", "iPhone 13 Pro Max", "iPhone 14", "iPhone 14 Pro", "iPhone 14 Pro Max", "iPhone 15", "iPhone 15 Pro", "iPhone 15 Pro Max"];
const Samsung = ["Samsung","Samsung Galaxy S23 FE", "Samsung Galaxy S22 Ultra", "Samsung Galaxy A02S", "Samsung Galaxy Note 8", "Samsung Galaxy A12"];
const OnePlus = ["OnePlus", "OnePlus 10T 5g", "OnePlus 11R 5g", "OnePlus Nord 2 5g", "OnePlus 8 Pro", "OnePlus 8 Pro 5g", "OnePlus 9R", "OnePlus Nord 2T 5g", "OnePlus Nord CE 5g", "OnePlus Nord CE 3", "OnePlus Nord CE 3 Lite 5g"];
const IQOO = ["IQOO","IQOO Z3", "IQOO Z5", "IQOO Z6", "IQOO Z6 LITE 5G", "IQOO Z6 PRO 5G", "IQOO 9 PRO 5G", "IQOO NEO 7 PRO 5G"];
const POCO = ["Poco","Poco C3", "Poco C31", "Poco C50", "Poco C51", "Poco C55", "Poco C65", "Poco F1", "Poco F2 Pro", "Poco F3", "Poco F3 GT", "Poco F4 5G", "Poco F5 5G", "Poco M2", "Poco M2 Pro", "Poco M2 Reloaded", "Poco M3", "Poco M3 Pro", "Poco M3 Pro 5G"];


function Req_Models(a) {
    if(a == "Realme"){
        return Realme;
    }else if(a == "MI_REDMI"){
        return MI_REDMI;
    }else if(a == "iPhone"){
        return iPhone;
    }else if(a == "Samsung"){
        return Samsung;
    }else if(a == "OnePlus"){
        return OnePlus;
    }else if(a == "IQOO"){
        return IQOO;
    }else if(a == "POCO"){
        return POCO;
    }
}



function Functionnn(x){
    let value = document.getElementById(`Mobile_Type${x}`).value;
    let data = Req_Models(value);
    let d = "";
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        d += `<option name="${element}">${element}</option>`;
        
    }
    // let x = 1;
    document.getElementById(`Models${x}`).innerHTML = d;
    
}




function Functionnssdasdn(x) {
    
    let value = document.getElementById(`Type${x}`).value;
    if (value == "Skins") {
        
        let v = `
        <option name="">Select</option>
        <option name="Glossy">Glossy</option>
        <option name="Matte">Matte</option>
        <option name="Sparkle">Sparkle</option>
        `;
        document.getElementById(`TypeA${x}`).innerHTML = v;
        
    }else if (value == "Cover") {

        let v = `
        <option name="">Select</option>
        <option name="Hard case">Hard case</option>
        <option name="Soft case">Soft case</option>
        `;
        // <option name="Glass Cover">Glass Cover</option>
        document.getElementById(`TypeA${x}`).innerHTML = v;
        
    }
}

// Update_Model${index+1}


function Update_Skin(n,x){
    document.getElementById(`Update_Skin${x}`).style.display = "none";
    let Models = document.getElementById(`TypeA${x}`).value;

    fetch("/cart/update",{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ID:`${n}`,Type:"Skin", Skin:Models}),
    }).then(response=>{return response.json();}).then(data=>{
        console.log(data.Success);
        if (data.Success == "1") {
            location.reload();
        }else{
            Message(data.Success);
            setTimeout(() => {
                location.reload();
                
            }, 3000);
        }
    }).catch(e=>{
        console.log("Error");
                
    });

}
function Update_Model(n,x){
    document.getElementById(`Update_Model${x}`).style.display = "none";
    let Models = document.getElementById(`Models${x}`).value;

    fetch("/cart/update",{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ID:`${n}`,Type:"Model", Model:Models}),
    }).then(response=>{return response.json();}).then(data=>{
        console.log(data.Success);
        if (data.Success == "1") {
            location.reload();
        }else{
            Message(data.Success);
            setTimeout(() => {
                location.reload();
                
            }, 3000);
        }
    }).catch(e=>{
        console.log("Error");
                
    });

}