class Tablero extends Dibujable {
  constructor(columns = 7, rows = 6, imgs = [Image], xPos = 0, yPos = 0, ctx = CanvasRenderingContext2D) {
    super(ctx, xPos, yPos)

    this.rows = rows
    this.columns = columns

    this.cellSize = 65

    this.imgs = imgs


    this.matrix = new Array(this.columns).fill().map(() => new Array(this.rows).fill())

    this.fixedZones = []

    this.hints = []



    this.setMatrix()
  }

  setMatrix() {
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        let img = this.imgs[Math.floor(Math.random() * this.imgs.length)]
        let resized = new ResizedImage(img, this.cellSize, this.cellSize, this.pos.x + this.cellSize * i, this.pos.y + this.cellSize * j, this.ctx)
        this.matrix[i][j] = new Casillero(resized, this.pos.x + this.cellSize * i, this.pos.y + this.cellSize * j, this.ctx)
      }
    }

    this.fixedZones = []
    this.hints = []

    for (let i = 0; i < this.columns; i++) {

      this.fixedZones.push(
        {
          x: {
            start: this.pos.x + i * this.cellSize,
            end: this.pos.x + (i + 1) * this.cellSize
          },

          y: {
            start: 0,
            end: this.pos.y
          }
        }
      )

      this.hints.push(new Circulo(20,this.fixedZones[i].x.start + (this.fixedZones[i].x.end - this.fixedZones[i].x.start )/2,this.fixedZones[i].y.end - 30, this.ctx))
      this.hints[i].fill = "#0000"


    }
  }

  draw() {

    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.matrix[i][j].draw()
      }
    }

    this.hints.forEach(hint => {
      console.log(hint);
      
      hint.draw()
    })

  }

  centerOnScreen(width = 0, height = 0) {
    super.updatePos(width / 2 - (this.columns * this.cellSize / 2), height - (this.rows * this.cellSize))
  }

  isInsideColumn(x = 0, y = 0) {
    let zone, column;

    if (this.fixedZones.some((coord, i) => {
      column = i;
      zone = coord;
      return (
        x > coord.x.start &&
        x <= coord.x.end &&
        y <= coord.y.end &&
        y > coord.y.start
      );
    })) {
      return [column, zone]
    } else {
      return [-1, null]
    }

  }

  //   console() {

  //     let res = ''
  //     for (let i = 0; i < this.columnas; i++) {
  //       for (let j = 0; j < this.filas; j++) {
  //         res += (this.matriz[i][j] == 0 ? '-' : this.matriz[i][j]) + " "
  //       }
  //       console.log(res)
  //       res = ""
  //     }

  //     console.log();

  //   }

  getCasillero(column = 0, row = 0) {
    return this.matrix[column][row]
  }

  getEndPos(){
    return {
      x : this.pos.x + this.columns * this.cellSize,
      y : this.pos.y + this.rows * this.cellSize
    }
  }

  addFicha(column = 0, jugador = Ficha) {
    let i = this.rows - 1;
    while (i >= 0 && this.matrix[column][i].jugador) {
      i--
    }

    if (i >= 0) {
      this.matrix[column][i].setJugador(jugador)
      return i
    }

    return -1


  }


  //   checkMatriz(n = 0){
  //     for (let i = 0; i < this.columnas; i++) {
  //       for (let j = 0; j < this.filas; j++) {
  //         if (this.matriz[i][j] != 0)
  //           if(this.checkWin(n, i, j))
  //             return true
  //       };

  //     }

  //     return false
  //   }


  //   checkWin(columna = 0, fila = 0, jugador = new Ficha(), fichasNecesarias = 4) {


  //     // // chequear hacia derecha    

  //     // if (columna + fichasNecesarias - 1 < this.columnas &&
  //     //   this.matriz[columna + fichasNecesarias - 1][fila] == n) {

  //     //   let i = columna + fichasNecesarias - 2;
  //     //   while (i > columna && this.matriz[i][fila] == n) {
  //     //     i--;
  //     //   }

  //     //   if (i == columna) {
  //     //     return ['der', true];
  //     //   }
  //     // }


  //     // // chequear hacia izquierda       

  //     // if (columna - fichasNecesarias + 1 >= 0 &&
  //     //   this.matriz[columna - fichasNecesarias + 1][fila] == n) {
  //     //   let i = columna - fichasNecesarias + 2;
  //     //   while (i < columna && this.matriz[i][fila] == n) {
  //     //     i++;
  //     //   }

  //     //   if (i == columna) {
  //     //     return ['izq', true];
  //     //   }
  //     // }


  //     // // chequear hacia abajo
  //     // if (fila + fichasNecesarias - 1 < this.filas &&
  //     //   this.matriz[columna][fila + fichasNecesarias - 1] == n) {
  //     //   let i = fila + fichasNecesarias - 2
  //     //   while (i > fila && this.matriz[columna][i] == n) {
  //     //     i--;
  //     //   }

  //     //   if (i == fila) {
  //     //     return ['aba', true]
  //     //   }
  //     // }


  //     // // chequear hacia izquierda-arriba

  //     // if (columna - fichasNecesarias + 1 >= 0 && fila - fichasNecesarias + 1 >= 0 &&
  //     //   this.matriz[columna - fichasNecesarias + 1][fila - fichasNecesarias + 1] == n) {
  //     //   let i = 1;
  //     //   while (columna - i >= 0 && fila - i >= 0 && this.matriz[columna - i][fila - i] == n) {
  //     //     i++;
  //     //   }

  //     //   if (i == fichasNecesarias) {
  //     //     return ['izq-arr', true];
  //     //   }
  //     // }


  //     // // chequear hacia izquierda-abajo

  //     // if (columna - fichasNecesarias + 1 >= 0 && fila + fichasNecesarias - 1 < this.filas &&
  //     //   this.matriz[columna - fichasNecesarias + 1][fila + fichasNecesarias - 1] == n) {
  //     //   let i = 1;
  //     //   while (columna - i >= 0 && fila + i < this.filas && this.matriz[columna - i][fila + i] == n) {
  //     //     i++;
  //     //   }

  //     //   if (i == fichasNecesarias) {
  //     //     return ['izq-aba', true];
  //     //   }
  //     // }


  //     // // chequear hacia derecha-arriba

  //     // if (columna + fichasNecesarias - 1 < this.columnas && fila - fichasNecesarias + 1 >= 0 &&
  //     //   this.matriz[columna + fichasNecesarias - 1][fila - fichasNecesarias + 1] == n) {
  //     //   let i = 1;
  //     //   while (columna + i < this.columnas && fila - i >= 0 && this.matriz[columna + i][fila - i] == n) {
  //     //     i++;
  //     //   }

  //     //   if (i == fichasNecesarias) {
  //     //     return ['der-arr', true];
  //     //   }
  //     // }


  //     // // chequear hacia derecha-abajo

  //     // if (columna + fichasNecesarias - 1 < this.columnas && fila + fichasNecesarias - 1 < this.filas &&
  //     //   this.matriz[columna + fichasNecesarias - 1][fila + fichasNecesarias - 1] == n) {
  //     //   let i = 1;
  //     //   while (columna + i < this.columnas && fila + i < this.filas && this.matriz[columna + i][fila + i] == n) {
  //     //     i++;
  //     //   }

  //     //   if (i == fichasNecesarias) {
  //     //     return ['der-aba', true];
  //     //   }
  //     // }

  //     // return false
  //   }

  //   draw(){

  //     for (let i = 0; i < this.columnas; i++) {
  //       for (let j = 0; j < this.filas; j++) {
  //         this.ctx.drawImage(this.image, this.xPos + (this.cellSize * i), this.yPos + (this.cellSize * j))
  //       }

  //     }
  //   }
  // }


  // function addFicha(tablero = new Tablero(), column = 0, n = 0) {
  //   let hayGanador = false

  //   if (!hayGanador) {
  //     tablero.addFicha(column, n)
  //     tablero.console()
  //     hayGanador = tablero.checkMatriz(n)
  //   }

  //   return hayGanador

  setHintColor(color = "#fff8"){
    this.hints.map(circle => {
      circle.fill = color
    })
  }


}



