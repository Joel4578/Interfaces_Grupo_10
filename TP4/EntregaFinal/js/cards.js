// Seleccionar todas las tarjetas
const cards = document.querySelectorAll('.card');

// Función del Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);  
        }
    });
}, { threshold: 0.5 });  // Observa cuando la tarjeta esté al menos al 50% visible

// Observar cada tarjeta
cards.forEach(card => {
    observer.observe(card);
});
