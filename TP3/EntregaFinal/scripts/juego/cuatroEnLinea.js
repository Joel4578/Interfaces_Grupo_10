// opciones de debajo

const pantallaGrande = document.getElementById('btn-fullscreen');

// pantalla inactiva

const play = document.getElementById('btn-play');
const pantalla = document.getElementById('pantalla-juego');
const pantallaPrincipal = document.getElementById('pantalla-juego-principal');

// botones principales

const btnJugarSolo = document.getElementById('solo');
const btnMultijugador = document.getElementById('multijugador');
const volverAtras = document.getElementById('volver');

// pantalla jugar solo y pantalla multijugador

// const pantallaSolo = document.querySelector('.form-juego');
const pantallaSolo = document.querySelector('#forms');
const pantallaMultijugador = document.getElementById('pantalla-multijugador');

// comenzar juego 

const jugar = document.getElementById('btn-listo-para-jugar');
const juego = document.getElementById('juego-ejecucion');

jugar.addEventListener('click', () =>{
    pantallaSolo.style.display = 'none';
    juego.style.display = 'flex';
});


// mostrar inicio de juego

play.addEventListener('click', () =>{
    pantalla.style.display = 'none';
    pantallaPrincipal.style.display = 'flex';
});

// jugar solo 
btnJugarSolo.addEventListener('click', () =>{
    pantallaPrincipal.style.display = 'none';
    pantallaSolo.style.display = 'grid';
}); 

// multijugador 

btnMultijugador.addEventListener('click', () =>{
    pantallaPrincipal.style.display = 'none';
    pantallaMultijugador.style.display = 'grid';
}); 

// volver atras 

volverAtras.addEventListener('click', () => {
    pantallaSolo.style.display = 'none';
    pantallaPrincipal.style.display = 'flex';
})

