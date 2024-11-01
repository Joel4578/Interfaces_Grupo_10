// opciones de debajo

const pantallaGrande = document.getElementById('btn-fullscreen');

// pantalla inactiva

const play = document.getElementById('btn-play');
const pantalla = document.getElementById('pantalla-juego');
const pantallaPrincipal = document.getElementById('pantalla-juego-principal');

// botones pantalla principal

const btnJugarSolo = document.getElementById('solo');
const btnMultijugador = document.getElementById('multijugador');

// pantalla jugar solo

const pantallaSolo = document.getElementById('pantalla-juego-solo');
const volverAtras = document.getElementById('volver');
const cuatroFichas = document.getElementById('cuatroPorCuatro');
const cincoFichas = document.getElementById('cincoPorCinco');
const seisFichas = document.getElementById('seisPorSeis');

// comenzar juego 

const jugar = document.getElementById('btn-listo-para-jugar');
const juego = document.getElementById('juego-pantalla');

// mostrar inicio de juego

play.addEventListener('click', () =>{
    pantalla.style.display = 'none';
    pantallaPrincipal.style.display = 'flex';
});

// jugar solo 
btnJugarSolo.addEventListener('click', () =>{
    pantallaPrincipal.style.display = 'none';
    pantallaSolo.style.display = 'flex';
}); 

// jugar.addEventListener('click', () =>{
//     pantallaSolo.style.display = 'none';
//     juego.style.display = 'flex';
// }); 

// volver atras 

volverAtras.addEventListener('click', () => {
    pantallaSolo.style.display = 'none';
    pantallaPrincipal.style.display = 'flex';
})

