const menuHamburguesa = document.querySelector('.menu-hambur');
const menuDesplegable = document.getElementById('menu-desplegable');

// Añade un evento de clic al botón del menú hamburguesa
menuHamburguesa.addEventListener('click', () => {
    menuHamburguesa.classList.toggle('open');
    
    menuDesplegable.classList.toggle('show');
      // Alterna la clase 'show' en el menú desplegable para mostrarlo u ocultarlo
});

// nav(sticky) + logo + movimiento de los contenedores del inicio
const header = document.querySelector('header');
// Añade un evento al desplazamiento de la ventana
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {    // Si el scroll supera los 50 píxeles, añade la clase 'sticky' al header
    header.classList.add('sticky');
  } else { // Hace que el header se "pegue" al tope
    header.classList.remove('sticky');
  }
});

const logo = document.querySelector('.logo-inicio');
// Valores iniciales y finales para la animación del logo
const initialTop = 55;
const finalTop = -131;
const initialScale = 1;
const finalScale = 0.247333; 
const scrollStart = 0; 
const scrollEnd = 300;
// Evento de desplazamiento para animar el logo
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
// Calcula el progreso de la animación basado en el scroll
  let progress = (scrollY - scrollStart) / (scrollEnd - scrollStart);
  progress = Math.max(0, Math.min(1, progress));
// Calcula la nueva posición superior del logo según el 
  const newTop = initialTop + (finalTop - initialTop) * progress;
  // Calcula la nueva escala del logo según el progreso
  const scale = initialScale + (finalScale - initialScale) * progress;

  logo.style.top = `${newTop}px`;
  logo.style.transform = `translateX(-50%) scale(${scale})`;
});

// Animacion de blur para img menos logo y figuras
const maxRotation = -20; 
const maxBlur = 6; 

const elementos = document.querySelectorAll(
  '.inicio img:not(.personaje-uno):not(.personaje-dos):not(.personaje-tres):not(.sombra-personaje-uno):not(.sombra-personaje-dos):not(.sombra-personaje-tres):not(.logo-inicio)'
);
// Evento de desplazamiento para aplicar rotación y desenfoque a los elementos seleccionados
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  let progress = (scrollY - scrollStart) / (scrollEnd - scrollStart);

  progress = Math.max(0, Math.min(1, progress));

  const rotation = maxRotation * progress;
  const blur = maxBlur * progress;

  elementos.forEach((elemento) => {
    elemento.style.transform = `rotateX(${rotation}deg)`;
    elemento.style.filter = `blur(${blur}px)`;
  });
});
const arboles = document.querySelectorAll('.arbol-uno, .arbol-dos, .arbol-tres');
const arbolDos = document.querySelector(".arbol-dos")
// Parámetros de animación para los árboles
const arbolInitialScale = 1; 
const arbolFinalScale = 0.9; 
const arbolScrollStart = 0; 
const arbolScrollEnd = 300; 

