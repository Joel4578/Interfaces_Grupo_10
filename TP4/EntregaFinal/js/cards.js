// Seleccionar todas las tarjetas con la clase 'card'
const cards = document.querySelectorAll('.card');

// Crear un Intersection Observer para detectar cuándo las tarjetas están visibles en el viewport
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { 
            // Si el elemento está al menos al 50% visible, agrega la clase 'show'
            entry.target.classList.add('show');
            // Deja de observar este elemento, ya no necesita seguimiento
            observer.unobserve(entry.target);  
        }
    });
}, { threshold: 0.5 });  // Configura un umbral del 50% de visibilidad

// Configurar el observador para cada tarjeta seleccionada
cards.forEach(card => {
    observer.observe(card);
});
