// Obtener los elementos del loader
const loaderContainer = document.getElementById('loader-container');
const percentageText = document.getElementById('percentage');
const progressBar = document.getElementById('progress');

// Simular carga 
let loadProgress = 0;

function updateLoader() {
    if (loadProgress <= 100) {
        // Actualizar el porcentaje y la barra de progreso
        percentageText.innerText = loadProgress + '%';
        progressBar.style.width = loadProgress + '%';

        loadProgress++;
        setTimeout(updateLoader, 50); // Actualiza cada 50ms (puedes ajustar el tiempo)

    } else {
        // Una vez que se haya completado la carga, ocultar el loader y mostrar el contenido
        loaderContainer.style.display = 'none';
        document.getElementById('main-content').style.display = 'block'; // Muestra el contenido principal
    }
}

// Iniciar el proceso de carga al cargar la página
window.addEventListener('load', () => {
    updateLoader();
});