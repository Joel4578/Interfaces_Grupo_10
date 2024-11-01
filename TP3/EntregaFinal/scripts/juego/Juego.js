// hay que cambiar todo lo que falte que quedó copiado del codigo, reemplazarlo por lo nuestro
// se cambia el JS, NO EL HTML

document.addEventListener('DOMContentLoaded', function() {
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

//variables para la imagen de la ficha seleccionada
let personaje1 = null;
let personaje2 = null;

//cantidad de fichas en linea
let fichasEnLinea = 0;

//dimensiones del tablero
let filas;
let columnas;
let totalFichas;
let tablero = null;
let fichas = [];

let lastClickedFicha = null;

//control del turno del jugador
let turnoPlayer = null;
let player1 = null;
let player2 = null;

//para que la ficha vuelva a su posicion inicial si se largó en un lugar fuera del tablero
let posXInicialFicha = 0;
let posYInicialFicha = 0;

let temporizador; 
let minutos = 2;
let segundos = 0;

// function iniciartemporizador(){
//     let tempDom = document.querySelector(".temporizador");

//     temporizador = setInterval(() => {
//         tempDom.innerHTML = `${minutos}:${segundos}`;

//         if(minutos === 0 && segundos === 0){
//             detenerTemporizador();
//             terminarJuego();
//             setTimeout(() => {mostrarGanador('Empate')}, 500); 
//         }else{
//             if(segundos === 0){
//                 minutos--;
//                 segundos = 59;
//             }else{
//                 segundos--;

//             }
//         }
//     }, 1000);
    
// }

// function detenerTemporizador(){
//     clearTimeout(temporizador)
// }


//obtengo los datos del formulario para iniciar el juego y los asigno a las variables globales
let form = document.querySelector('.form-juego');
form.addEventListener('submit', function (e){
    e.preventDefault();
    console.log("Formulario enviado");

    let formData = new FormData(form);
    
    fichasEnLinea = parseInt(formData.get('enlinea'));
    filas = fichasEnLinea + 2;
    columnas = fichasEnLinea + 3;
    personaje1 = formData.get('grupo1');
    personaje2 = formData.get('grupo2');

    iniciarJuego();
});




function iniciarJuego(){
    //iniciartemporizador();
    

    //oculto el formulario y muestro el juego
    let juego = document.getElementById('juego-pantalla');
    let formJuego = document.getElementById('pantalla-juego-solo');
    formJuego.classList.add('ocultar');
    juego.classList.remove('ocultar');
    
    //creo el tablero y calculo la cantidad total de fichas
    tablero = new Tablero(filas, columnas, canvas);
    totalFichas = filas * columnas;
    
    //creo los jugadores
    player1 = new Player(1, "Player 1");
    player2 = new Player(2, "Player 2");

    turnoPlayer = player1;
    mostrarTurno(turnoPlayer);

    function addFigures() {
        //divido por 2 la cantidad total para que tengan la misma cantidad de fichas
        for (let i = 0; i < totalFichas / 2; i++) {
            addficha(60, 450, tablero.getRadio(), 'blue', ctx, player1, personaje1, 'red');
            addficha(840, 450, tablero.getRadio(), 'red', ctx, player2, personaje2, 'green');
        }
        drawFigures();
    }
    addFigures();

    function addficha(x, y, radio, color, ctx, player, personaje, resaltado) {
        let ficha = new Ficha(x, y, radio, color, ctx, player, personaje);
        ficha.resaltadoEstilo = resaltado;
        fichas.push(ficha);
    }


    //eventos del mouse
    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mouseup", onMouseup, false);
    canvas.addEventListener("mousemove", onMouseMove, false);
}

function drawFigures() {
    clearCanvas();
    for (let i = 0; i < fichas.length; i++) {
        fichas[i].draw(ctx);
    }
}

let isMouseDown = false;

function onMouseDown(e) {
    isMouseDown = true;

    if (lastClickedFicha != null) {
        lastClickedFicha.setResaltado(false);
        lastClickedFicha = null;
    }

    let clickfig = findClickedFigure(e.offsetX, e.offsetY);

    if (clickfig != null) {
        clickfig.setResaltado(true);
        lastClickedFicha = clickfig;
        posXInicialFicha = clickfig.getPosX();
        posYInicialFicha = clickfig.getPosY();
    }
    drawFigures();
}

function onMouseup(e) {
    isMouseDown = false;
    //devuelvo la columna de la ref si está en zona
    let col = estaEnZona();
    if(col != -1){
        ubicarFicha(lastClickedFicha, col);
       let ganador = chequearGanador();
       if(ganador != null){
            detenerTemporizador();
            mostrarGanador(ganador);
            terminarJuego();
       }
       //intercambio los turnos luego de cada tirada
        if(turnoPlayer.getId() == 1){
            turnoPlayer = player2;
        }else{
            turnoPlayer = player1;
        }
        mostrarTurno(turnoPlayer);

    }else if(lastClickedFicha != null){ //si la ficha no fue soltada dentro de un circulo de referencia, la devuelvo a la pila
        lastClickedFicha.setPosition(posXInicialFicha, posYInicialFicha);
    }
    drawFigures();
}

function onMouseMove(e) {
    if (isMouseDown && lastClickedFicha != null) {
        lastClickedFicha.setPosition(e.offsetX, e.offsetY);
        drawFigures();
    }
}

function findClickedFigure(x, y) {
    for (let i = 0; i < fichas.length; i++) {
        const ficha = fichas[i];
        //devuelvo la ficha solo si se clickeo una del jugador del turno actual
        if (ficha.getPlayerId() == turnoPlayer.getId() && ficha.isPointInside(x, y)) {
            return ficha;
        }
    }   
}

//verifico si la ficha se soltó dentro de un circulo de referencia
function estaEnZona(){
    let zona = tablero.getReferencias();
    for(let i = 0; i < zona.length; i++){
        let ref = zona[i];
        if(lastClickedFicha != null){
            if(tablero.estaDentroRef(lastClickedFicha, ref)){
                return ref.columna;
            }
        }
    }
    return -1;
}

//ubico la ficha en el tablero
function ubicarFicha(lastClickedFigure, col){
    tablero.ubicarFichaEnMatriz(col, lastClickedFigure);
}

function clearCanvas() {
    ctx.fillStyle = '#210876';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    tablero.dibujartablero();
    tablero.dibujarReferencias();
}

//chequear si hay ganadores o empate en caso de que ya no queden fichas disponibles
function chequearGanador(){
    if(verificarHorizontal(player1) || verificarVertical(player1) || verificarDiagonalIzqADer(player1) || verificarDiagonalDerAIzq(player1)){
        return "Ganador: Player 1";
    }else if(verificarHorizontal(player2) || verificarVertical(player2) || verificarDiagonalIzqADer(player2) || verificarDiagonalDerAIzq(player2)){
        return  "Ganador: Player 2";
    }else if(!fichasDisponibles()){
        return "Empate";
    }
    return null;
}

//verifico si quedan fichas disponibles para poder seguir jugando
function fichasDisponibles(){
    for(let i = 0; i < fichas.length; i++){
        let ficha = fichas[i];
        if(ficha.isDisponible()){
            return true;
        }
    }
    return false;
}

//en caso de haber ganador, lo muestro en el dom
let domGanador = document.getElementById('ganador');
function mostrarGanador(player){
    domGanador.classList.add('mostrar');
    domGanador.innerHTML = "";
    domGanador.innerHTML = `${player}`;
}

//muestro el turno actual
let domTurno = document.getElementById('mostrar-jugador');
function mostrarTurno(player){
    domTurno.innerHTML = "";
    domTurno.innerHTML = `Turno: ${player.getNombre()}`;
}

function terminarJuego(){
    //deshabilita el canvas para que no se pueda seguir jugando
    canvas.style.pointerEvents = 'none';
}

//verificar horizontalmente
function verificarHorizontal(player){
    let filas = tablero.getFilas() - 1;
    let columnas = tablero.getColumnas() - 1;

    for(let fila = filas; fila >= 0; fila--){ //recorro las filas desde la ultima(abajo)
        //recorro las columnas hasta que col sea menor o igual al total de las columnas - la cantidad de fichas en linea necesarias
        //para no recorrer el resto innecesariamente ya que no se obtendra un resultado positivo
        for(let col = 0; col <= columnas - fichasEnLinea; col++){ 
            let contador = 0;

            //recorro desde la columna obtenida hasta la cantidad de fichas en lineas necesarias para ganar
            //si no se encuentran la cantidad necesaria de corrido, se reinicia y empieza de nuevo con la siguiente col
            for(let i = 0; i <= fichasEnLinea - 1; i++){
                let celda = tablero.matriz[fila][col + i];
                if(celda.tieneFicha === true && buscarFicha(celda.x, celda.y, player)){
                    contador++;
                }      
            }
            if(contador === fichasEnLinea){
                return true;
            } 
        }      
    }
    return false;
}

//verificar vertical
function verificarVertical(player){
    let filas = tablero.getFilas() - 1;
    let columnas = tablero.getColumnas() - 1;
    
    for(let col = 0; col < columnas; col++){ //recorro desde la primer columna
        //empiezo desde ultima fila (abajo) hasta que la fila sea mayor o igual a la cantidad de fichas necesarias
        //para no recorrer el resto innecesariamente ya que no se obtendra un resultado positivo
        for(let fila = filas; fila >= fichasEnLinea - 1; fila--){ 
            let contador = 0;

            //recorro desde la fila obtenida hasta la cantidad de fichas en lineas necesarias para ganar
            //si no se encuentran la cantidad necesaria de corrido, se reinicia y empieza de nuevo con la siguiente fila
            for(let i = 0; i <= fichasEnLinea - 1; i++){
                let celda = tablero.matriz[fila - i][col];
                if(celda.tieneFicha === true && buscarFicha(celda.x, celda.y, player)){
                    contador++;
                }     
            }

            if(contador === fichasEnLinea){
                return true;
            } 
        }        
    }
    return false;
}

//verificar diagonal de izquierda a derecha
function verificarDiagonalIzqADer(player) {
    let filas = tablero.getFilas() - 1;
    let columnas = tablero.getColumnas() - 1;

    //empiezo desde ultima fila (abajo) hasta que la fila sea mayor o igual a la cantidad de fichas necesarias
    //para no recorrer el resto innecesariamente ya que no se obtendra un resultado positivo
    for (let fila = filas; fila >= fichasEnLinea - 1; fila--) {
        for (let col = 0; col <= columnas - fichasEnLinea; col++) {
            let contador = 0;

            //recorro desde la fila y col obtenida hasta la cantidad de fichas en lineas necesarias para ganar
            //si no se encuentran la cantidad necesaria de corrido, se reinicia y empieza de nuevo con la siguiente col
            for (let i = 0; i < fichasEnLinea; i++) {
                let celda = tablero.matriz[fila - i][col + i]; //le resto i a fila para subir y le sumo i a col para moverme a la izq
                if (celda.tieneFicha === true && buscarFicha(celda.x, celda.y, player)) {
                    contador++;
                }
            }

            if (contador === fichasEnLinea) {
                return true;
            }
        }
    }
    return false;
}

function verificarDiagonalDerAIzq(player) {
    let filas = tablero.getFilas() - 1; //le resto uno para que sea la ultima fila
    let columnas = tablero.getColumnas() - 1;

    //empiezo desde ultima fila (abajo) hasta que la fila sea mayor o igual a la cantidad de fichas necesarias
    //para no recorrer el resto innecesariamente ya que no se obtendra un resultado positivo
    for (let fila = filas; fila >= fichasEnLinea - 1; fila--) {
    //empiezo desde la ultima columna hasta que la columna sea mayor o igual a la cantidad de fichas necesarias
    //para no recorrer el resto innecesariamente ya que no se obtendra un resultado positivo
        for (let col = columnas; col >= fichasEnLinea - 1; col--) {
            let contador = 0;

            for (let i = 0; i < fichasEnLinea; i++) {
                let celda = tablero.matriz[fila - i][col - i]; //le resto i a fila para subir y le resto i a col para moverme a la der
                if (celda.tieneFicha === true && buscarFicha(celda.x, celda.y, player)) {
                    contador++;
                }
            }

            if (contador === fichasEnLinea) {
                return true;
            }
        }
    }
    return false;
}

//busco si la ficha que esta en la celda es del jugador que estoy controlando
function buscarFicha(x, y, player){
    for(let i = 0; i < fichas.length; i++){
        let ficha = fichas[i];
        if(ficha.getPosX() === x && ficha.getPosY() === y && ficha.getPlayerId() === player.getId()){
            return true;
        }
    }
    return false;
}

//reinicio el juego
document.querySelector('.reiniciar').addEventListener('click', () => {
    tablero = null;
    fichas = [];
    detenerTemporizador();
    minutos = 2;
    segundos = 0;
    domGanador.classList.remove('mostrar');
    iniciarJuego();
});

});