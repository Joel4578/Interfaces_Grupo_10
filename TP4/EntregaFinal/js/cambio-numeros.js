document.addEventListener('DOMContentLoaded', function () {
    // Obtenemos todas las imágenes dentro del contenedor
    const images = document.querySelectorAll('.img img');

    // Añadimos el evento de scroll
    window.addEventListener('scroll', handleScroll);

    // Función que maneja el scroll
    function handleScroll() {
        const scrollPosition = window.scrollY + window.innerHeight;

        // Recorremos todas las imágenes
        images.forEach((img, index) => {
            let imgPosition = img.getBoundingClientRect().top + window.scrollY; 

            // Si la imagen está dentro de la parte visible de la ventana
            if (scrollPosition > imgPosition - 170 && scrollPosition < imgPosition + img.height) {
                img.style.opacity = 0;
            } else {
                img.style.opacity = 1;
            }
        });
    }

    // Llamamos a la función de scroll para aplicar los estilos iniciales cuando se carga la página
    handleScroll();
});
