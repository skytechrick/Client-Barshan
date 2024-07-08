


document.getElementById("Ind").addEventListener("input",()=>{
    document.getElementById("Message").style.display = "none";

})


document.getElementById("Btn").addEventListener("click",()=>{
    document.getElementById("Btn").disabled = true;
    let val = document.getElementById("Ind").value
    if(val.length != 6){
        document.getElementById("Btn").disabled = false;
        document.getElementById("Message").innerHTML = "Enter correct OTP";
        document.getElementById("Message").style.display = "block";
    }else{
        let Xc = 0;
        for (let e = 0; e < val.length; e++) {
            const element = val[e];
            if("1234567890".includes(element)){
                Xc =1;
            }else{
                Xc =2;
                break;
            }
        }
        if(Xc == 2){
            document.getElementById("Btn").disabled = false;
            document.getElementById("Message").innerHTML = "Enter correct OTP1";
            document.getElementById("Message").style.display = "block";
        }else{
            document.getElementById("Ind").disabled = true;
            document.getElementById("Message").innerHTML = "Please wait...";
            document.getElementById("Message").style.display = "block";
            document.getElementById("Message").style.color = "black";


            let send = {
                OTP: val,
                Ver:"Yes"
            };

            fetch("/signup/otp",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(send),
            }).then(response =>{return response.json()}).then(data=>{
                if (data.Success) {
                    

                    document.getElementById("Message").innerHTML = data.Message;
                    document.getElementById("Message").style.display = "block";
                    document.getElementById("Message").style.color = "green";
                    setTimeout(() => {
                        window.location.replace("/login");
                    }, 2000);
                    
                }else{
                    
                    
                    document.getElementById("Btn").disabled = false;
                    document.getElementById("Ind").disabled = false;
                    document.getElementById("Message").innerHTML = data.Message;
                    document.getElementById("Message").style.display = "block";
                    document.getElementById("Message").style.color = "red";
                    
                    
                }

            }).catch(e=>{

            });
            





        }
    }
})