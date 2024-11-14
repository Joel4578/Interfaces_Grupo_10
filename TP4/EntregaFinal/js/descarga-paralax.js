(function() {
    document.addEventListener("mousemove", parallax);
    const img = document.querySelector('.seccion-imagen img');

    // Función de parallax
    function parallax(e) {
        // Obtener las dimensiones del viewport
        let _w = window.innerWidth / 2;  // Centro de la pantalla en el eje X
        let _h = window.innerHeight / 2; // Centro de la pantalla en el eje Y
        let _mouseX = e.clientX;         // Posición del cursor en el eje X
        let _mouseY = e.clientY;         // Posición del cursor en el eje Y

        // Invertir el movimiento: se cambia el signo en las ecuaciones
        let moveX = (_w - _mouseX) * 0.05;  // Invertir la dirección horizontal
        let moveY = (_h - _mouseY) * 0.05;  // Invertir la dirección vertical

        // Aplicar el movimiento en la imagen usando transform: translate y scale
        img.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;  // Aumenta el tamaño con scale
    }
})();

