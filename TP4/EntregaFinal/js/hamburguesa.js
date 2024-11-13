// Obtener los elementos del menú
const menuHamburguesa = document.getElementById('menu-hamburguesa');
const menuDesplegable = document.getElementById('menu-desplegable');

// Función para activar/desactivar la animación
menuHamburguesa.addEventListener('click', () => {
    // Cambiar el estado de la imagen del menú hamburguesa (transformarla en cruz)
    menuHamburguesa.classList.toggle('open');
    
    // Mostrar/ocultar el menú desplegable
    menuDesplegable.classList.toggle('show');
});
