document.addEventListener("DOMContentLoaded", function() {
    const loader = document.getElementById("loader");
    const percentage = document.getElementById("percentage");
    const progress = document.getElementById("progress");
    const content = document.getElementById("content");
    
    let load = 0;
    const totalDuration = 5000; 
    const intervalTime = 500; 
    const increments = totalDuration / intervalTime; // Número de incrementos
    
    const interval = setInterval(() => {
        load += 100 / increments;
        percentage.innerText = `${Math.round(load)}%`;
        progress.style.width = `${load}%`;

        if (load >= 100) {
            clearInterval(interval);
            loader.style.display = "none"; // Oculta el loader
            content.style.display = "block"; // Muestra el contenido
        }
    }, intervalTime);
});

const corazonButton = document.querySelector('.corazon');

corazonButton.addEventListener('click', () => {
    corazonButton.classList.toggle('active');
});