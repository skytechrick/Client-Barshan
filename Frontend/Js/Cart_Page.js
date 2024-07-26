

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


function Files_Upload(n,x){
    // document.getElementById(`Files_Upload_${x}`).style.display = "none";
    let a = document.getElementById(`Files${x}`);


    let aa = a.files[0];

    if (aa) {
        const maxSizeInBytes = 2 * 1024 * 1024;
        if (aa.size < maxSizeInBytes) {
            
            
            
            let Data = new FormData();
            Data.append('File_1', aa);
            Data.append('ID', n);
            Data.append('Type', "Files");
        
        
        
            fetch("/cart/update",{
                method:"PUT",
                body: Data
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
                Message("Error");
                
            });
        }else{
            Message("File size must not more then 2MB");

        }    
    }else{
        Message("No File Selected");

    }

}


