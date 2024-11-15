document.addEventListener('DOMContentLoaded', function () {
    // Obtener los elementos
    var playButton = document.getElementById('playButton'); // Imagen que se hace clic
    var videoContainer = document.getElementById('video'); // Contenedor del video
    var videoFrame = document.getElementById('videoFrame'); // El iframe del video

    // Evento de clic en la imagen
    playButton.addEventListener('click', function () {
        // Mostrar el contenedor del video
        videoContainer.style.display = 'block';

        // Ocultar la imagen de reproducción
        playButton.style.display = 'none';

        // Obtener las coordenadas y dimensiones de la imagen
        var rect = playButton.getBoundingClientRect();

        // Ajustar el contenedor del video para que tenga la misma posición y tamaño que la imagen
        videoContainer.style.top = rect.top + 'px';  // Posición vertical
        videoContainer.style.left = rect.left + 'px';  // Posición horizontal
        videoContainer.style.width = rect.width + 'px';  // Ancho
        videoContainer.style.height = rect.height + 'px';  // Alto

        // Establecer el src del iframe para comenzar la reproducción del video
        videoFrame.src = "https://www.youtube.com/embed/0YKa9DQYdRg?autoplay=1"; // Asegúrate de usar el ID correcto del video
    });
});

 

    


