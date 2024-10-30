// opciones de debajo

const pantallaGrande = document.getElementById('btn-fullscreen');

// pantalla inactiva

const play = document.getElementById('btn-play');
const pantalla = document.getElementById('pantalla-juego');
const pantallaPrincipal = document.getElementById('pantalla-juego-principal');
const canvas = document.getElementById('c');

// botones pantalla principal

const btnJugarSolo = document.getElementById('solo');
const btnMultijugador = document.getElementById('multijugador');

// pantalla jugar solo

const pantallaSolo = document.getElementById('pantalla-juego-solo');
const volverAtras = document.getElementById('volver');
const cuatroFichas = document.getElementById('cuatroPorCuatro');
const cincoFichas = document.getElementById('cincoPorCinco');
const seisFichas = document.getElementById('seisPorSeis');

// seleccionar fichas

const pantallaSeleccionarFicha = document.getElementById('pantalla-seleccionar-fichas');

// mostrar inicio de juego

play.addEventListener('click', () =>{
    pantalla.style.display = 'none';
    canvas.style.display = 'flex';
    // pantallaPrincipal.style.display = 'flex';
});

// jugar solo 
btnJugarSolo.addEventListener('click', () =>{
    pantallaPrincipal.style.display = 'none';
    pantallaSolo.style.display = 'flex';
}); 

// cuatro por cuatro (facil)

cuatroFichas.addEventListener('click', () => {
    pantallaSolo.style.display = 'none';
    pantallaSeleccionarFicha.style.display = 'flex';
})

// volver atras 

volverAtras.addEventListener('click', () => {
    pantallaSolo.style.display = 'none';
    pantallaPrincipal.style.display = 'flex';
})

