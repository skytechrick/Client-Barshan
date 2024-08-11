
function Message(Show) {
    document.getElementById("Message_Box").style.display = "flex";
    document.getElementById("Message_Text").innerHTML = Show;
    document.getElementById("Message_Box").style.animationName = "Messag";
    setTimeout(() => {
        document.getElementById("Message_Box").style.animationName = "Message";        
    }, 1500);
    
}


document.getElementById("PayOnline1").addEventListener('click',()=>{
    document.getElementById("Final_BTN").innerHTML = `<button id="Final_BTNN" type="button" onclick="Final_BTN(1);">Place Order</button>`;
    
});
document.getElementById("PayOnline2").addEventListener('click',()=>{
    document.getElementById("Final_BTN").innerHTML = `<button id="Final_BTNN" type="button" onclick="Final_BTN(2);">Place Order</button>`;

});



function Final_BTN(n) {
    document.getElementById("Final_BTN").innerHTML = ``;
    // let a = document.getElementById("");
    fetch("/order",{
        method:"PUT", 
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({Placed_Type:n}),
    }).then(response=>{return response.json()}).then(data=>{

        console.log(data);
        if (data.Success == "Yes") {
            window.location.replace(data.Link);
            
        }else if(data.Success == "Paid"){
            window.location.replace(data.Link);
            
        }else if(data.Success == "Logout"){
            window.location.replace("/");
            // location.reload();
        }else{
            Message("Unable to place order");
            
        }
    }).catch(e=>{
        Message("Connection Error");
        setTimeout(() => {
            location.reload();
        }, 1500);
    })
}