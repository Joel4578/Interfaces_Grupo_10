
document.addEventListener("DOMContentLoaded", function() {
    
    const gifs = document.querySelectorAll(".gif");
    let currentIndex = 0;

    
    function changeGif() {
        gifs[currentIndex].classList.remove('active');

        currentIndex = (currentIndex + 1) % gifs.length; // Esto asegura que vuelva a empezar desde el principio cuando se alcance el final

        gifs[currentIndex].classList.add('active');
    }
    setInterval(changeGif, 3000);
    gifs[currentIndex].classList.add('active');
});


