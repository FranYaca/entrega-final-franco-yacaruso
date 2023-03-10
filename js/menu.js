let btn_menu = document.querySelector(".menu");
let categorias = document.querySelector(".categorias");

function ocultar_menu(){
    if(categorias.style.display != "flex"){
        categorias.style.display = "flex";
    } else{
        categorias.style.display = "none";
    }
};

btn_menu.addEventListener("click", ocultar_menu);

window.addEventListener("scroll", function(){
    let header = document.querySelector("header");
    header.classList.toggle("abajo",window.scrollY>0);
})