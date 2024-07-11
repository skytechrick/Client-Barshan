
function Message(Show) {
    document.getElementById("Message_Box").style.display = "flex";
    document.getElementById("Message_Text").innerHTML = Show;
    document.getElementById("Message_Box").style.animationName = "Messag";
    setTimeout(() => {
        document.getElementById("Message_Box").style.animationName = "Message";        
    }, 2000);
    
}




function Sub() {
    document.getElementById("wrapn").disabled = true;
    let Email = document.getElementById("Email");
    let Password = document.getElementById("Password");

    let Sent = {
        Email:Email.value,
        Password:Password.value,
        Mess:"Hello developer/hacker"
    };

    fetch("/login",{
        body:JSON.stringify(Sent),
        headers:{"Content-Type":"application/json"},
        method:"POST"
    }).then(response=>{return response.json()}).then(data=>{
        console.log(data);
        document.getElementById("wrapn").disabled = false;
        if (data.Success == false) {
            if (data.Message == "A") {
                let OB = data.OB
                let KL = "";
                if (OB.Email !=1) {
                    KL += `${OB.Email}`;
                }
                if (OB.Password !=1) {
                    if (KL.length > 3) {
                        KL += ` & ${OB.Password}`;
                        
                    }else{
                        KL += `${OB.Password}`;
                        
                    }
                    
                }
                Message(KL);
            }else if(data.Message == "OTP"){
                window.location.replace("/signup/otp");
            }else{
                Message(data.Message);
            }
        }else if (data.Success == true) {
            Message(data.Message);
            setTimeout(() => {
                window.location.replace("/");
            }, 2000);
        
        }

    }).catch(e=>{
        document.getElementById("wrapn").disabled = false;
        Message("Unble to connect with the server.");
    })
    
}