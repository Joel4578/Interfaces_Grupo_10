const elem1 = document.getElementById("iframe");
const elem2 = document.getElementById("tres");
const scrollTop = window.scrollY;

window.onscroll = function(){
   
    let posicion = window.scrollY || document.documentElement.scrollTop;
    elem1.style.bottom = posicion * 0.3 + "px";
    elem2.style.bottom = posicion * 0.6 + "px";
}