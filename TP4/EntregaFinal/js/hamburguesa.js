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
// Obtener el logo y el header
// Selecciona el logo
const logo = document.querySelector('.logo-inicio');

// Valores límite para la posición del logo
const initialTop = 150; // Posición inicial del logo en px
const finalTop = 10; // Posición final en el header en px
const scrollStart = 0; // Scroll donde empieza el movimiento
const scrollEnd = 300; // Scroll donde termina el movimiento

// Escucha el evento de scroll
window.addEventListener('scroll', () => {
  // Obtén el valor actual del scroll
  const scrollY = window.scrollY;

  // Calcula la nueva posición del logo
  let newTop = initialTop - ((initialTop - finalTop) * (scrollY - scrollStart)) / (scrollEnd - scrollStart);

  // Restringe el movimiento dentro de los límites
  newTop = Math.max(finalTop, Math.min(initialTop, newTop));

  // Aplica la nueva posición al logo
  logo.style.top = `${newTop}px`;

  // Calcula el tamaño dinámico del logo (opcional)
  const scale = 1 - ((scrollY - scrollStart) / (scrollEnd - scrollStart)) * 0.5; // Reduce hasta un 50%
  logo.style.transform = `translateX(-50%) scale(${Math.max(0.5, scale)})`;
});


