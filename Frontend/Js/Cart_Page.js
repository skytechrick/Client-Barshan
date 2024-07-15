

function Message(Show) {
    document.getElementById("Message_Box").style.display = "flex";
    document.getElementById("Message_Text").innerHTML = Show;
    document.getElementById("Message_Box").style.animationName = "Messag";
    setTimeout(() => {
        document.getElementById("Message_Box").style.animationName = "Message";        
    }, 1500);
    
}


// document.getElementById("Option_Selected").addEventListener('change', ()=>{
//     document.getElementById("Update").style.display = "inline-block";
// });


function Update(n, x){
    let ggg = `Update${x}`
    document.getElementById(ggg).style.display = "none";

    let xc = document.getElementById(`Option_Selected${x}`).value;
    fetch("/cart/update",{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ID:`${n}`,Type:"Update", Selected:xc})
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
function delete_cart(n,x){
    document.getElementById(`delete_cart${x}`).style.display = "none";

    fetch("/cart/update",{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ID:`${n}`,Type:"Delete"})
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


