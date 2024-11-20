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