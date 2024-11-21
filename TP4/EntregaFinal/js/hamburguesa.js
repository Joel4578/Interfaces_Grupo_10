const menuHamburguesa = document.querySelector('.menu-hambur');
const menuDesplegable = document.getElementById('menu-desplegable');

menuHamburguesa.addEventListener('click', () => {
    menuHamburguesa.classList.toggle('open');
    
    menuDesplegable.classList.toggle('show');
});

const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) { 
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});

const logo = document.querySelector('.logo-inicio');

const initialTop = 55;
const finalTop = -131;
const initialScale = 1;
const finalScale = 0.247333; 
const scrollStart = 0; 
const scrollEnd = 300;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  let progress = (scrollY - scrollStart) / (scrollEnd - scrollStart);
  progress = Math.max(0, Math.min(1, progress));

  const newTop = initialTop + (finalTop - initialTop) * progress;

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

const arbolInitialScale = 1; 
const arbolFinalScale = 0.9; 
const arbolScrollStart = 0; 
const arbolScrollEnd = 300; 