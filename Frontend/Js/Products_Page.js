

function P_LIST(n) {
    let D = `P_LIST${n}`;
    let X = document.getElementById(D);
    
    let link = X.src;
    document.getElementById("product_IMMMf").src = link;

}

if (window.innerWidth > 920) {
    
    let a = document.getElementsByClassName("ImageSection")[0];
    let b = window.getComputedStyle(a);
    let wid = b.width;
    document.getElementById("DescSection").style.width = `calc(100% - ${wid})`;
}


document.getElementById("ShareLink").addEventListener("click", ()=>{
    // document.getElementById("ShareLink").style.transition = "200ms background-color";
    document.getElementById("ShareLink").style.backgroundColor = "#00e600";
    document.getElementById("ShareLink").innerHTML = "Copied!";


    let cc = window.location.href;
    console.log(cc);
    navigator.clipboard.writeText(cc).then(function() {
        setTimeout(() => {
            document.getElementById("ShareLink").style.backgroundColor = "rgb(235, 235, 235)";
            document.getElementById("ShareLink").innerHTML = "Share Now (Copy link)";
            
        }, 1250);
    }).catch(function(error) {
        alert('Failed to copy text copy again');
    });
    
});
document.getElementById("ShareLink1").addEventListener("click", ()=>{
    // document.getElementById("ShareLink").style.transition = "200ms background-color";
    document.getElementById("ShareLink1").style.backgroundColor = "#00e600";
    document.getElementById("ShareLink1").innerHTML = "Copied!";
    
    // let aA = document.getElementById("product_IMMMf").src;
    
    aA = `Check out! This new product \n ${window.location.href} \n`;

    let a = encodeURIComponent(aA);

    let text1 = `https://api.whatsapp.com/send?phone=919749848292&text=${a}`
    ;
    window.location.href = text1;
    
});