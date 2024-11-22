
document.addEventListener("DOMContentLoaded", function() {
    
    const gifs = document.querySelectorAll(".gif");
    let currentIndex = 0;

    
    function changeGif() {
        gifs[currentIndex].classList.remove('active');

        currentIndex = (currentIndex + 1) % gifs.length; // Esto asegura que vuelva a empezar desde el principio cuando se alcance el final

        gifs[currentIndex].classList.add('active');
    }
    setInterval(changeGif, 3000);
    gifs[currentIndex].classList.add('active');
});


const elem1 = document.getElementById("cuatro");
const elem2 = document.getElementById("cinco");
const elem3 = document.getElementById("texto");
const elem4 = document.getElementById("gif");


const scrollTop = window.scrollY;
window.onscroll = function(){
   
    let posicion = window.scrollY || document.documentElement.scrollTop;

    elem1.style.bottom = posicion * 0.4 + "px";
    elem2.style.bottom = posicion * 0.3 + "px";
    elem3.style.bottom = posicion * 0.1 + "px";
    elem4.style.bottom = posicion * 0.2 + "px";
}



