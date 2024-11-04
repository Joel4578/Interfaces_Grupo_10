class Tablero {
  constructor(filas, columnas, canvas, modo) {
    this.filas = filas;
    this.columnas = columnas;
    this.modo = modo;
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.matriz = this.crearMatriz();
    this.img = new Image();
    this.img.src = 'imgs/cuatro-en-linea/casillero.png';
    this.imgReferencia = new Image();
    this.imgReferencia.src = 'imgs/cuatro-en-linea/flecha.png';

    this.definirModo();
    this.referencias = [];
    this.crearReferencias();
  }

  definirModo() {
    switch (this.modo) {
      case '4':
        this.anchoCasilla = 50;
        this.altoCasilla = 50;
        break;
      case '5':
        this.anchoCasilla = 45;
        this.altoCasilla = 45;
        break;
      case '6':
        this.anchoCasilla = 40;
        this.altoCasilla = 40;
        break;
      default:
        this.anchoCasilla = null;
        this.altoCasilla = null;
        break;
    }
  }

  crearMatriz() {
    const rectWidth = this.canvas.width * 0.46;
    const rectHeight = this.canvas.height * 0.69;
    const cellWidth = rectWidth / this.columnas;
    const cellHeight = rectHeight / this.filas;
    const offsetX = (this.canvas.width - rectWidth) / 2;
    const offsetY = (this.canvas.height - rectHeight) / 2;

    const radius = Math.min(cellWidth, cellHeight) / 2;

    let matAux = Array.from({ length: this.filas }, () => Array(this.columnas).fill(0));
    for (let i = 0; i < this.filas; i++) {
      for (let j = 0; j < this.columnas; j++) {
        const x = offsetX + j * cellWidth + cellWidth / 2; // Centrado
        const y = offsetY + i * cellHeight + cellHeight / 2; // Centrado

        let celda = { x, y, radius, tieneFicha: false, width: cellWidth, height: cellHeight };
        matAux[i][j] = celda;
      }
    }
    return matAux;
  }

  dibujartablero() {
    const margenHorizontal = (this.canvas.width - this.columnas * this.anchoCasilla) / 2;
    const margenVertical = this.canvas.height - (this.filas * this.altoCasilla) - 40;

    for (let i = 0; i < this.filas; i++) {
      for (let j = 0; j < this.columnas; j++) {
        const x = margenHorizontal + j * this.anchoCasilla;
        const y = margenVertical + i * this.altoCasilla;
        this.context.drawImage(this.img, x, y, this.anchoCasilla, this.altoCasilla);
      }
    }
  }

  getRadio() {
    const cellWidth = this.canvas.width * 0.8 / this.columnas;
    const cellHeight = this.canvas.height * 0.6 / this.filas;
    return Math.min(cellWidth, cellHeight) / 2; 
  }

  crearReferencias() {
    const Radius = this.getRadio();
    let cellWidthFactor;

    switch (this.modo) {
      case '4':
        cellWidthFactor = 0.45;
        break;
      case '5':
        cellWidthFactor = 0.50;
        break;
      case '6':
        cellWidthFactor = 0.50;
        break;
      default:
        cellWidthFactor = 0.45;
        break;
    }
    const cellWidth = this.canvas.width * cellWidthFactor / this.columnas;
    const offsetX = (this.canvas.width - cellWidth * this.columnas) / 2;

    const altoTablero = this.filas * this.altoCasilla;
    const margenVertical = this.canvas.height - altoTablero - 20;
    const offsetY = margenVertical / 2;

    for (let i = 0; i < this.columnas; i++) {
      const x = Math.round(offsetX + i * cellWidth + cellWidth / 2);
      const y = Math.round(offsetY);

      let circuloReferencia = { x, y, radius: Radius, columna: i };
      this.referencias.push(circuloReferencia);
    }
  }

  dibujarReferencias() {
    for (let i = 0; i < this.referencias.length; i++) {
      let ref = this.referencias[i];

      const x = ref.x - this.imgReferencia.width / 2;
      const y = ref.y - this.imgReferencia.height;

      if (this.imgReferencia.complete) {
        this.context.drawImage(this.imgReferencia, x, y, this.imgReferencia.width, this.imgReferencia.height);
      }
    }
  }

  getFilas() {
    return this.filas;
  }

  getColumnas() {
    return this.columnas;
  }

  getReferencias() {
    return this.referencias;
  }

  estaDentroRef(circulo, ref) {
    let _x = ref.x - circulo.getPosX();
    let _y = ref.y - circulo.getPosY();
    return Math.sqrt(_x * _x + _y * _y) < ref.radius;
  }

  ubicarFichaEnMatriz(columna, ficha) {
    const filaInicio = this.filas - 1;
    for (let i = filaInicio; i >= 0; i--) {
      let celda = this.matriz[i][columna];
      if (!celda.tieneFicha) {
        // Ajusta la posición de la ficha para que esté centrada en la celda
        ficha.setPosition(celda.x, celda.y);
        celda.tieneFicha = true;
        ficha.disponible = false;
        ficha.resaltado = false;
        break;
      }
    }
  }
}
