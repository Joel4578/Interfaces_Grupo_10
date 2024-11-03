class Tablero {
  constructor(filas, columnas, canvas) {
    this.filas = filas;
    this.columnas = columnas;
    this.anchoCasilla = 50; // Ajusta este valor según tus necesidades
    this.altoCasilla = 50;
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.matriz = this.crearMatriz();    
    this.dibujartablero();
    this.referencias = [];
    this.crearReferencias();
    this.dibujarReferencias();

  }
  
  crearMatriz() {
     
        const rectWidth = this.canvas.width * 0.8;
        const rectHeight = this.canvas.height * 0.6;
        //calcula el ancho total de la celda en funcion en el ancho total del rect
        // ancho rect / por el numero de columnas de la matriz.
        const cellWidth = rectWidth / this.columnas;
        const cellHeight = rectHeight / this.filas;
        /el tamaño de los circulos/
    
        // /posiciones del rectangulo x e y/ 
        //dividido 2 para que este en el medio del canvas
        const offsetX = (this.canvas.width - rectWidth) / 2;
        const offsetY = (this.canvas.height - rectHeight) / 4;
        const Radius = this.getRadio();
        //creo una matriz vacia de tamaño filas * columnas
        let matAux = Array.from({ length: this.filas }, () => Array(this.columnas).fill(0));
        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
              /*
                x: posicion horizontal inicial del rectangulo del tablero
                j*cellwidth : es la pos horizontal de la columna * ancho de cada celda
                desplza la pos x  en la que se encuentre el ciruclo
                /2 se ajusa para que el circulo este dentro de la celda
                resumen :  para centrar el circulo dentro de la celda
              */
                const x = offsetX + j * cellWidth + cellWidth / 2;
                const y = offsetY + i * cellHeight + cellHeight / 2;
      
                let celda = { x, y, radius: Radius, tieneFicha: false};
                matAux[i][j] = celda;
            } 
        }
      return matAux;
  }
  
 
  dibujartablero() {
    const anchoCanvas = this.canvas.width * 0.8;
    const altoCanvas = this.canvas.height * 0.6;
    const margenHorizontal = (anchoCanvas - this.columnas * this.anchoCasilla) / 2;
    const margenVertical = (altoCanvas - this.filas * this.altoCasilla) / 2;

    // Cargar la imagen del casillero
    const casilleroImg = new Image();
    casilleroImg.src = 'imgs/cuatro-en-linea/casillero.png';

    casilleroImg.onload = () => {
        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                const x = margenHorizontal + j * this.anchoCasilla; 
                const y = margenVertical + i * this.altoCasilla;
                this.context.drawImage(casilleroImg, x, y, this.anchoCasilla, this.altoCasilla);
            }
        }
    };

  }

  getRadio(){
    //ancho del canvas * 0.8 usa el ancho total del canvas y
    //divide por el numero de columnas  de la matriz
    //representa el ancho de cada celda en el tablero
    const cellWidth = this.canvas.width * 0.8 / this.columnas;
    const cellHeight = this.canvas.height * 0.6 / this.filas;
    return Math.min(cellWidth, cellHeight) / 2 - 5;
  }

  crearReferencias(){
    const Radius = this.getRadio();
    const cellWidth = this.canvas.width * 0.8 / this.columnas;
    const cellHeight = this.canvas.height * 0.6 / this.filas;
    const offsetX = (this.canvas.width - cellWidth * this.columnas) / 2;
    const offsetY = (this.canvas.height - cellHeight * this.filas) / 6;

    for (let i = 0; i < this.columnas; i++) {
        const x = Math.round(offsetX + i * cellWidth + cellWidth / 2);
        const y = Math.round(offsetY - Radius / 2);
    
        let circuloReferencia = {x, y, radius: Radius, columna: i};
        this.referencias.push(circuloReferencia);
    }
  }


  dibujarReferencias() {
    for (let i = 0; i < this.referencias.length; i++) {
        let ref = this.referencias[i];
        this.context.beginPath();
        this.context.arc(ref.x, ref.y, ref.radius, 0, 2 * Math.PI);
        this.context.fillStyle = "#78EC8C";
        this.context.fill();
        this.context.closePath();
    }

  }

  getFilas(){
    return this.filas;
  }

  getColumnas(){
    return this.columnas;
  }

  getReferencias(){
    return this.referencias;
  }

  //verifico si una ficha se encuentra dentro de los circulos de referencia
  estaDentroRef(circulo, ref){
    let _x = ref.x - circulo.getPosX();
    let _y = ref.y - circulo.getPosY();
       
    return Math.sqrt(_x * _x + _y * _y) < ref.radius;  
  }


 ubicarFichaEnMatriz(columna, ficha){
    for(let i = this.filas - 1; i >= 0; i--){
        let celda = this.matriz[i][columna];
        if(celda.tieneFicha === false){ //verifico que no haya una ficha en la celda
            ficha.setPosition(celda.x, celda.y);
            this.matriz[i][columna].tieneFicha = true;
            ficha.disponible = false; //se setea en false para que no se pueda mover la ficha ubicada en una celda
            ficha.resaltado = false;
            break;
        }
        
    }

 }
 

}