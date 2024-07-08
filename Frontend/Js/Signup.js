



function Sub(){
    document.getElementById("signupbtn").disabled = true;
    
    let Name = document.getElementById("Name");
    let Mobile_Number = document.getElementById("Mobile_Number");
    let Email = document.getElementById("Email");
    let Create_Password = document.getElementById("Create_Password");
    let Confirm_Password = document.getElementById("Confirm_Password");


    let send = {
        Name:Name.value, 
        Mobile_Number:Mobile_Number.value,
        Email:Email.value,
        Create_Password:Create_Password.value,
        Confirm_Password:Confirm_Password.value
    };

    console.log(send);

    fetch("/signup",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(send),

    }).then(response=>{return response.json();}).then(data=>{
        console.log(data);
        let Name = document.getElementById("C-Name");
        let Mobile = document.getElementById("C-Mobile");
        let Email = document.getElementById("C-Email");
        let Create = document.getElementById("C-Create");
        let Confirm = document.getElementById("C-Confirm");
        if(data.Success == true){
            document.getElementById("signupbtn").disabled = true;
            window.location.replace("/signup/otp");
        }else if(data.Success == false){
            document.getElementById("signupbtn").disabled = false;
            let OB = data.OBJ;


            if (OB.Name != 1) {
                Name.innerHTML = OB.Name;
                Name.style.visibility = "visible";
            }
            if (OB.Email != 1) {
                Email.innerHTML = OB.Email;
                Email.style.visibility = "visible";
            }
            if (OB.Mob != 1) {
                Mobile.innerHTML = OB.Mob;
                Mobile.style.visibility = "visible";
            }
            if (OB.Cre_Pass != 1) {
                Create.innerHTML = OB.Cre_Pass;
                Create.style.visibility = "visible";
            }
            if (OB.Con_Pass != 1) {
                Confirm.innerHTML = OB.Con_Pass;
                Confirm.style.visibility = "visible";
            }
        }else{
            document.getElementById("signupbtn").disabled = false;
            console.log(data.Message);
        }
    }).catch(e=>{
        console.log("ERROR...");
    })





    
}


document.addEventListener("DOMContentLoaded",()=>{

    document.getElementById("Name").addEventListener('input',()=>{
        let Name = document.getElementById("C-Name");
        Name.style.visibility = "hidden";
        console.log(1);
    });
    document.getElementById("Mobile_Number").addEventListener('input',()=>{
        let Mobile = document.getElementById("C-Mobile");
        Mobile.style.visibility = "hidden";
        console.log(2);
    });
    document.getElementById("Email").addEventListener('input',()=>{
        let Email = document.getElementById("C-Email");
        Email.style.visibility = "hidden";
        console.log(3);
    });
    document.getElementById("Create_Password").addEventListener('input',()=>{
        let Create = document.getElementById("C-Create");
        Create.style.visibility = "hidden";
        console.log(4);
    });
    document.getElementById("Confirm_Password").addEventListener('input',()=>{
        let Confirm = document.getElementById("C-Confirm");
        Confirm.style.visibility = "hidden";
        console.log(5);
    });
});




































































































































































