

if (window.innerWidth < 530) {
    console.log(1);
    let UpDownDiv = document.getElementById("UpDownDiv");
    UpDownDiv.addEventListener("click", ()=>{
        console.log(2);
        let UpDown = document.getElementById("UpDown");
        if (UpDown.innerHTML == "arrow_drop_up") {
            console.log(22);
            
            document.getElementById("INNSTSTR1").style.display = "none";
            // document.getElementById("INNSTSTR2").style.display = "none";
            // document.getElementById("INNSTSTR3").style.display = "none";
            document.getElementById("INNSTSTR4").style.display = "none";
            document.getElementById("CatM").style.display = "none";
            document.getElementById("INNSTSTR6").style.display = "none";
            document.getElementById("INNSTSTR7").style.display = "none";
            UpDown.innerHTML = "arrow_drop_down";
        }else{
            console.log(222);
            document.getElementById("INNSTSTR1").style.display = "flex";
            // document.getElementById("INNSTSTR2").style.display = "flex";
            // document.getElementById("INNSTSTR3").style.display = "flex";
            document.getElementById("INNSTSTR4").style.display = "flex";
            document.getElementById("CatM").style.display = "flex";
            document.getElementById("INNSTSTR6").style.display = "flex";
            document.getElementById("INNSTSTR7").style.display = "flex";
            UpDown.innerHTML = "arrow_drop_up";
            
        }
    })


}