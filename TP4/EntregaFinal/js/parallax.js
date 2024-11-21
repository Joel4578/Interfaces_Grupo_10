const image = document.getElementsByClassName('divertida');

// Evento de scroll en la ventana para que el movimiento se base en el scroll global de la página
window.onscroll = function () {
  let y = window.scrollY;  // Usamos scrollY para obtener el desplazamiento vertical global

  // Movimiento del iframe (ajustar la velocidad como se desee)
  image.style.top = 100 - y * 0.2 + "px";  // Ajusta la velocidad del movimiento

  // Movimiento de la imagen "tres" (ajustar la velocidad como se desee)
  image.style.top = 100 - y * 0.6 + "px";  // Ajusta la velocidad del movimiento
};