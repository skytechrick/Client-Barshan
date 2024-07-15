

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