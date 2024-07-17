

function Message(Show) {
    document.getElementById("Message_Box").style.display = "flex";
    document.getElementById("Message_Text").innerHTML = Show;
    document.getElementById("Message_Box").style.animationName = "Messag";
    setTimeout(() => {
        document.getElementById("Message_Box").style.animationName = "Message";        
    }, 1500);
    
}

function Address_Btn() {
    let A = document.getElementById("Address").value;
    let B = document.getElementById("PIN").value;
    
    const htmlText = A.replace(/\r\n|\r|\n/g, '<br>');

    
    fetch("/profile/update",{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({Address:htmlText, PIN:B}),
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
        Message("Connection error");
                
    });
        
    
}