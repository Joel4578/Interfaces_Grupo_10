// Obtener los elementos del loader
const loaderContainer = document.getElementById('loader-container');
const percentageText = document.getElementById('percentage');
const progressBar = document.getElementById('progress');

// Simular carga (puedes reemplazarlo con un proceso real, como una llamada AJAX o la carga de recursos)
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



//esto es para la animacion de las cards, pero no me quiere andar

// Seleccionamos todos los cards
//const cards = document.querySelectorAll('.card');

// Creamos el Intersection Observer
//const observer = new IntersectionObserver((entries, observer) => {
//  entries.forEach(entry => {
        // Si el card está visible en la pantalla
//    if (entry.isIntersecting) {
            // Añadimos la clase 'visible' para activar la animación
//      entry.target.classList.add('visible');
//      observer.unobserve(entry.target); // Dejamos de observar el card después de que se haga visible
//        }
//    });
//}, {
//    threshold: 0.5 // El card tiene que estar al menos 50% visible para activar la animación
//});
//
// Observamos todos los cards
//cards.forEach(card => {
//    observer.observe(card);
//});
