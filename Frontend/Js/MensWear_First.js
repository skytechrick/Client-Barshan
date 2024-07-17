


function Add_to_Cart(n) {

    let x = {
        ID:n
    }
    console.log(x);
    fetch("/add-to-cart",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(x),
    }).then(response=>{return response.json()}).then(data=>{
        if(data.Success == "332a"){
            window.location.replace("/login");
        }else if(data.Success == 1){
            document.getElementById("Background").style.animationName = "Fade";
            document.getElementById("Background").style.display = "flex";
            setTimeout(() => {
                document.getElementById("Background").style.display = "none";
            }, 1500);

            console.log("Order Successfully.");
        }else{
            console.log("Can not place order.");
        }
    }).catch(e=>{
        console.log("Error.."+e);
    })  
}
function Buy_Now(n) {

    let x = {
        ID:n
    }
    console.log(x);
    fetch("/buyNow",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(x),
    }).then(response=>{return response.json()}).then(data=>{
        if(data.Success == "332a"){
            window.location.replace("/login");
        }else if(data.Success == 1){
            // setTimeout(() => {
            window.location.replace("/cart");
            // }, 1500);

            console.log("Order Successfully.");
        }else{
            console.log("Can not place order.");
        }
    }).catch(e=>{
        console.log("Error.."+e);
    })
}