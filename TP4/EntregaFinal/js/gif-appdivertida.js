
// Espera a que el contenido del DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function() {
    
    // Selecciona todos los elementos con la clase "gif"
const gifs = document.querySelectorAll(".gif");
let currentIndex = 0;

    // Función para cambiar el gif activo
function changeGif() {
    gifs[currentIndex].classList.remove('active');

    currentIndex = (currentIndex + 1) % gifs.length; // Esto asegura que vuelva a empezar desde el principio cuando se alcance el final

        // Agrega la clase 'active' al nuevo gif activo
    gifs[currentIndex].classList.add('active');
}

    // Cambia el gif activo cada 3 segundos (3000 milisegundos)
setInterval(changeGif, 3000);

    // Asegura que el primer gif esté activo al cargar la página
gifs[currentIndex].classList.add('active');
});

//seleccionamos todos los elementos de la appdivertida para lograr efecto parallax
const elem1 = document.getElementById("cuatro");
const elem2 = document.getElementById("cinco");
const elem3 = document.getElementById("texto");
const elem4 = document.getElementById("gif");


// Evento que se ejecuta cada vez que el usuario hace scroll en la página
const scrollTop = window.scrollY;
window.onscroll = function(){

let posicion = window.scrollY || document.documentElement.scrollTop;
    // Obtiene la posición actual del scroll (en píxeles)


elem1.style.bottom = posicion * 0.4 + "px";
elem2.style.bottom = posicion * 0.3 + "px";
elem3.style.bottom = posicion * 0.1 + "px";
elem4.style.bottom = posicion * 0.2 + "px";
}



