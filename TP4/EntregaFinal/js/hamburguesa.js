// Obtener los elementos del menú
const menuHamburguesa = document.querySelector('.menu-hambur');
const menuDesplegable = document.getElementById('menu-desplegable');

// Función para activar/desactivar la animación
menuHamburguesa.addEventListener('click', () => {
    // Cambiar el estado de la imagen del menú hamburguesa (transformarla en cruz)
    menuHamburguesa.classList.toggle('open');
    
    // Mostrar/ocultar el menú desplegable
    menuDesplegable.classList.toggle('show');
});

const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) { // Ajusta el valor 50 según tus necesidades
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});

// animacion para que el logo se vaya al header
/// Selecciona el logo
const logo = document.querySelector('.logo-inicio');

// Valores límite para la posición del logo y escala
const initialTop = 55;
const finalTop = -131;
const initialScale = 1;
const finalScale = 0.247333; 
const scrollStart = 0; 
const scrollEnd = 300;

window.addEventListener('scroll', () => {
  // Obtén el valor actual del scroll
  const scrollY = window.scrollY;

  // Calcula el progreso del scroll entre 0 y 1
  let progress = (scrollY - scrollStart) / (scrollEnd - scrollStart);

  // Restringe el progreso entre 0 y 1
  progress = Math.max(0, Math.min(1, progress));

  // Calcula la nueva posición del logo
  const newTop = initialTop + (finalTop - initialTop) * progress;

  // Calcula la nueva escala del logo
  const scale = initialScale + (finalScale - initialScale) * progress;

  // Aplica la nueva posición y escala al logo
  logo.style.top = `${newTop}px`;
  logo.style.transform = `translateX(-50%) scale(${scale})`;
});