
// Selecciona el elemento con el id "iframe" del DOM
const elem1 = document.getElementById("iframe");

// Selecciona el elemento con el id "tres" del DOM
const elem2 = document.getElementById("tres");

// Obtiene la posición inicial del desplazamiento vertical en la ventana
const scrollTop = window.scrollY;

// Define una función que se ejecutará cada vez que el usuario se desplace (scroll) en la página
window.onscroll = function() {

    // Obtiene la posición actual del scroll (ya sea de window o de document)
    let posicion = window.scrollY || document.documentElement.scrollTop;

    // Cambia la posición del elemento "iframe" respecto a la parte inferior
    // Multiplica la posición actual del scroll por 0.3 para un movimiento más suave
    elem1.style.bottom = posicion * 0.3 + "px";

    // Cambia la posición del elemento "tres" respecto a la parte inferior
    // Multiplica la posición actual del scroll por 0.6 para un movimiento más rápido
    elem2.style.bottom = posicion * 0.6 + "px";
};