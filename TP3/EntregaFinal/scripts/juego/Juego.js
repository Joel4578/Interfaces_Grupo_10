class Juego {

    // CONSTRUCTOR JUEGO

    constructor(ctx = CanvasRenderingContext2D, canvas = HTMLCanvasElement) {

        this.ctx = ctx;
        this.canvas = canvas;
    
        this.EQUIPOS_EN_JUEGO = []
    
        this.FICHAS_EN_JUEGO = {}
    
        this.currentEquipo = ''
    
        this.gameSettings = {
            columnas: 7,
            rows: 6,
            fichasToWin: 4,
            duration: 0
        }
    
        this.fichaBehaviour = {
            currentTurn: 0,
            counter: 0,
            currentColumn: undefined,
            currentFichaIndex : -1,
            currentCasillero: undefined,
            targetY: 0
        }
    
        this.currentFicha = null
    
        // DEFINIMOS LAS IMAGENES 
    
        this.IMGS = {
            FONDO: getImage('imgs/cuatro-en-linea/fondo-juego.png'),
            TITULO: getImage('imgs/cuatro-en-linea/titulo-juego.png'),
            CLICPARAEMPEZAR: {
                default: getImage('imgs/cuatro-en-linea/btn-comenzar.png'),
                hover: getImage('imgs/cuatro-en-linea/btn-comenzar-hover.png')
            },
            CANT_FICHAS: getImage('imgs/cuatro-en-linea/cantidad-fichas-titulo.png'),
            SELECCION_FICHAS: {
              4 : {
                default : getImage('imgs/cuatro-en-linea/4-EN-LINEA.png'),
                hover: getImage('imgs/cuatro-en-linea/4-EN-LINEA_hover.png')
              },
              5 : {
                default : getImage('imgs/cuatro-en-linea/5-EN-LINEA.png'),
                hover: getImage('imgs/cuatro-en-linea/5-EN-LINEA_hover.png')
              },
              6 : {
                default : getImage('imgs/cuatro-en-linea/6-EN-LINEA.png'),
                hover: getImage('imgs/cuatro-en-linea/6-EN-LINEA_hover.png')
              }
            },
            SELECTMODE: {
                4: {
                    empty: getImage('./img/juego/select-4-empty.png'),
                },
                5: {
                    empty: getImage('./img/juego/select-5-empty.png'),
                },
                6: {
                    empty: getImage('./img/juego/select-6-empty.png'),
                },
                7: {
                    empty: getImage('./img/juego/select-7-empty.png'),
                }
            }
        } 
    
        // DEFINIMOS LOS ESTADOS DE NUESTRO JUEGO
    
        this.STATES = {
            MENU: 'menu',
            SELECTION_CANTIDAD_FICHAS_MENU: 'selecciona cantidad de fichas',
            SELECT_MODE: 'select mode',
            SELECT_FICHA: 'select ficha',
            TRANSITION_SELECT_FICHA_STARTING: 'transition select ficha to starting',
            DISPLAY_CURRENT_FICHAS : 'display current fichas',
            GAME: 'game',
            STARTING: 'starting',
            WINNER: 'winner',
            TIE: 'tie',
            FICHA_DROP: 'ficha drop',
        }
    
        this.state = this.STATES.MENU
    
        this.UI = {}

        // FONDO JUEGO

        this.UI.FONDO = new UIElement(new ResizedImage(this.IMGS.FONDO, 755, 442, 0, 0, ctx), null, 0, 0, this.ctx)

        // MENU PRINCIPAL
    
        this.UI.MENU = new UIElement(new ResizedImage(this.IMGS.FONDO, 755, 442, 0, 0, ctx), null, 0, 0, this.ctx)
    
        this.UI.TITULO = new UIElement(new ResizedImage(this.IMGS.TITULO, 300, 150, 0, 0, ctx), null, canvas.width /2 - 150,  canvas.height / 2 - 180, this.ctx)

        this.UI.CLICPARAEMPEZAR = new UIElement(new ResizedImage(this.IMGS.CLICPARAEMPEZAR.default, 350, 44, undefined, undefined, ctx),new ResizedImage(this.IMGS.CLICPARAEMPEZAR.hover, 350, 44, undefined, undefined, ctx), canvas.width / 2 - 175, canvas.height - 120, ctx)

        // ACCIONES DEL BOTON CLICPARAEMEPEZAR
        
        this.UI.CLICPARAEMPEZAR.onClick = () => {
            this.state = this.STATES.SELECTION_CANTIDAD_FICHA_MENU
            this.canvas.classList.remove('pointer')
        }
    
        this.UI.CLICPARAEMPEZAR.onHover = () => {
            this.canvas.classList.add('pointer')
        }

        this.UI.CLICPARAEMPEZAR.onHoverLeave = () => {
            this.canvas.classList.remove('pointer')
        }

        // SELECCION DE FICHAS

        this.UI.TITULO_PEQUENIO = new UIElement(new ResizedImage(this.IMGS.TITULO, 150, 75, 0, 0, ctx), null, canvas.width /2 - 80,  canvas.height / 2 - 180, this.ctx)

        this.UI.TITULO_CANTIDAD_FICHAS = new UIElement(new ResizedImage(this.IMGS.CANT_FICHAS, 664, 33, 0, 0, ctx), null, canvas.width /2 - 330 ,  canvas.height / 2 - 60  , this.ctx);

        this.UI.SELECCION_FICHAS = {
            4: new UIElement(new ResizedImage(this.IMGS.SELECCION_FICHAS[4].default, 167, 29, undefined, undefined, ctx),new ResizedImage(this.IMGS.SELECCION_FICHAS[4].hover, 226, 29, undefined, undefined, ctx), canvas.width / 2 - 94, canvas.height - 210, ctx),
            5: new UIElement(new ResizedImage(this.IMGS.SELECCION_FICHAS[5].default, 167, 29, undefined, undefined, ctx),new ResizedImage(this.IMGS.SELECCION_FICHAS[5].hover, 226, 29, undefined, undefined, ctx), canvas.width / 2 - 94, canvas.height - 140, ctx),
            6: new UIElement(new ResizedImage(this.IMGS.SELECCION_FICHAS[6].default, 167, 29, undefined, undefined, ctx),new ResizedImage(this.IMGS.SELECCION_FICHAS[6].hover, 226, 29, undefined, undefined, ctx), canvas.width / 2 - 94, canvas.height - 70, ctx)
        }

        this.UI.CUATROFICHAS = new UIElement(new ResizedImage(this.IMGS.SELECCION_FICHAS[4].default, 167, 29, undefined, undefined, ctx),new ResizedImage(this.IMGS.SELECCION_FICHAS[4].hover, 226, 29, undefined, undefined, ctx), canvas.width / 2 - 94, canvas.height - 210, ctx)

        this.UI.CUATROFICHAS.onClick = () => {
          this.gameSettings.fichasToWin = 4
          this.gameSettings.columnas = 7
          this.gameSettings.duration = this.gameSettings.columnas * this.gameSettings.rows * 10
          this.canvas.classList.remove('pointer')
          this.state = this.STATES.SELECCION_PERSONAJE
        }

        this.UI.CUATROFICHAS.onHover = () => {
          this.canvas.classList.add('pointer');
        }

        this.UI.CUATROFICHAS.onHoverLeave = () => {
          this.canvas.classList.remove('pointer');
        }

        this.UI.CINCOFICHAS = new UIElement(new ResizedImage(this.IMGS.SELECCION_FICHAS[5].default, 167, 29, undefined, undefined, ctx),new ResizedImage(this.IMGS.SELECCION_FICHAS[5].hover, 226, 29, undefined, undefined, ctx), canvas.width / 2 - 94, canvas.height - 140, ctx)
        
        this.UI.CINCOFICHAS.onClick = () => {
          this.gameSettings.fichasToWin = 5
          this.gameSettings.columnas = 8
          this.gameSettings.duration = this.gameSettings.columnas * this.gameSettings.rows * 10
          this.canvas.classList.remove('pointer')
          this.state = this.STATES.SELECCION_PERSONAJE
        }

        this.UI.CINCOFICHAS.onHover = () => {
          this.canvas.classList.add('pointer');
        }

        this.UI.CINCOFICHAS.onHoverLeave = () => {
          this.canvas.classList.remove('pointer');
        }

        this.UI.SEISFICHAS = new UIElement(new ResizedImage(this.IMGS.SELECCION_FICHAS[6].default, 167, 29, undefined, undefined, ctx),new ResizedImage(this.IMGS.SELECCION_FICHAS[6].hover, 226, 29, undefined, undefined, ctx), canvas.width / 2 - 94, canvas.height - 70, ctx)

        this.UI.CINCOFICHAS.onClick = () => {
          this.gameSettings.fichasToWin = 6
          this.gameSettings.columnas = 9
          this.gameSettings.duration = this.gameSettings.columnas * this.gameSettings.rows * 10
          this.canvas.classList.remove('pointer')
          this.state = this.STATES.SELECCION_PERSONAJE
        }

        this.UI.CINCOFICHAS.onHover = () => {
          this.canvas.classList.add('pointer');
        }

        this.UI.CINCOFICHAS.onHoverLeave = () => {
          this.canvas.classList.remove('pointer');
        }

        this.UI.SELECTMODE = {
          4: new UIElement(new ResizedImage(this.IMGS.SELECTMODE[4].empty, 197, 50, undefined, undefined, this.ctx), new ResizedImage(this.IMGS.SELECTMODE[4].filled, 197, 50, undefined, undefined, this.ctx), canvas.width / 2 - 343 / 2, (canvas.height / 2 - 50 / 2) * 4, this.ctx),
          5: new UIElement(new ResizedImage(this.IMGS.SELECTMODE[5].empty, 243, 50, undefined, undefined, this.ctx), new ResizedImage(this.IMGS.SELECTMODE[5].filled, 243, 50, undefined, undefined, this.ctx), canvas.width / 2 - 343 / 2, (canvas.height / 2 - 50 / 2) * 4, this.ctx),
          6: new UIElement(new ResizedImage(this.IMGS.SELECTMODE[6].empty, 290, 50, undefined, undefined, this.ctx), new ResizedImage(this.IMGS.SELECTMODE[6].filled, 290, 50, undefined, undefined, this.ctx), canvas.width / 2 - 343 / 2, (canvas.height / 2 - 50 / 2) * 4, this.ctx),
          7: new UIElement(new ResizedImage(this.IMGS.SELECTMODE[7].empty, 343, 50, undefined, undefined, this.ctx), new ResizedImage(this.IMGS.SELECTMODE[7].filled, 343, 50, undefined, undefined, this.ctx), canvas.width / 2 - 343 / 2, (canvas.height / 2 - 50 / 2) * 4, this.ctx),
        }
    
        this.UI.SELECTMODE[5].clickableArea = {
          x: {
            start: this.UI.SELECTMODE[4].pos.x + this.UI.SELECTMODE[4].width,
            end: this.UI.SELECTMODE[5].pos.x + this.UI.SELECTMODE[5].width
          },
          y: {
            start: this.UI.SELECTMODE[5].pos.y,
            end: this.UI.SELECTMODE[5].pos.y + this.UI.SELECTMODE[5].height
          }
        }
        this.UI.SELECTMODE[6].clickableArea = {
          x: {
            start: this.UI.SELECTMODE[5].pos.x + this.UI.SELECTMODE[5].width,
            end: this.UI.SELECTMODE[6].pos.x + this.UI.SELECTMODE[6].width
          },
          y: {
            start: this.UI.SELECTMODE[6].pos.y,
            end: this.UI.SELECTMODE[6].pos.y + this.UI.SELECTMODE[6].height
          }
        }
        this.UI.SELECTMODE[7].clickableArea = {
          x: {
            start: this.UI.SELECTMODE[6].pos.x + this.UI.SELECTMODE[6].width,
            end: this.UI.SELECTMODE[7].pos.x + this.UI.SELECTMODE[7].width
          },
          y: {
            start: this.UI.SELECTMODE[7].pos.y,
            end: this.UI.SELECTMODE[7].pos.y + this.UI.SELECTMODE[7].height
          }
        }
    
        this.UI.SELECTMODE[4].onHover = () => {
          this.UI.SELECTMODE[5].isHovereable = false
          this.UI.SELECTMODE[6].isHovereable = false
          this.UI.SELECTMODE[7].isHovereable = false
        }
        this.UI.SELECTMODE[5].onHover = () => {
          this.UI.SELECTMODE[4].isHovereable = false
          this.UI.SELECTMODE[6].isHovereable = false
          this.UI.SELECTMODE[7].isHovereable = false
        }
        this.UI.SELECTMODE[6].onHover = () => {
          this.UI.SELECTMODE[4].isHovereable = false
          this.UI.SELECTMODE[5].isHovereable = false
          this.UI.SELECTMODE[7].isHovereable = false
        }
        this.UI.SELECTMODE[7].onHover = () => {
          this.UI.SELECTMODE[4].isHovereable = false
          this.UI.SELECTMODE[6].isHovereable = false
          this.UI.SELECTMODE[5].isHovereable = false
        }
        this.UI.SELECTMODE[4].onHoverLeave = () => {
          this.UI.SELECTMODE[5].isHovereable = true
          this.UI.SELECTMODE[6].isHovereable = true
          this.UI.SELECTMODE[7].isHovereable = true
        }
        this.UI.SELECTMODE[5].onHoverLeave = () => {
          this.UI.SELECTMODE[4].isHovereable = true
          this.UI.SELECTMODE[6].isHovereable = true
          this.UI.SELECTMODE[7].isHovereable = true
        }
        this.UI.SELECTMODE[6].onHoverLeave = () => {
          this.UI.SELECTMODE[4].isHovereable = true
          this.UI.SELECTMODE[5].isHovereable = true
          this.UI.SELECTMODE[7].isHovereable = true
        }
        this.UI.SELECTMODE[7].onHoverLeave = () => {
          this.UI.SELECTMODE[4].isHovereable = true
          this.UI.SELECTMODE[5].isHovereable = true
          this.UI.SELECTMODE[6].isHovereable = true
        }
        this.UI.SELECTMODE[4].onClick = () => {
          this.gameSettings.fichasToWin = 4
          this.gameSettings.columnas = 7
          this.gameSettings.duration = this.gameSettings.columnas * this.gameSettings.rows * 10
    
          this.state = this.STATES.SELECT_FICHA
        }
        this.UI.SELECTMODE[5].onClick = () => {
          this.gameSettings.fichasToWin = 5
          this.gameSettings.columnas = 8
          this.gameSettings.duration = this.gameSettings.columnas * this.gameSettings.rows * 10
    
          this.state = this.STATES.SELECT_FICHA
        }
        this.UI.SELECTMODE[6].onClick = () => {
          this.gameSettings.fichasToWin = 6
          this.gameSettings.columnas = 9
          this.gameSettings.duration = this.gameSettings.columnas * this.gameSettings.rows * 10
    
          this.state = this.STATES.SELECT_FICHA
        }
        this.UI.SELECTMODE[7].onClick = () => {
          this.gameSettings.fichasToWin = 7
          this.gameSettings.columnas = 10
          this.gameSettings.duration = this.gameSettings.columnas * this.gameSettings.rows * 10
    
          this.state = this.STATES.SELECT_FICHA
        }
    
        this.tablero
    
        this.mouse = {
            x: 0,
            y: 0,
        }
    
    
        this.ESCENAS = {}
    
        this.ESCENAS.INICIA_TABLERO = new Escena(this.ctx, (t) => {
          this.ctx.globalAlpha = t
          let scaleFactor = 2 - t
          let translateY = 50 * (1 - t)
          let centerX = this.canvas.width / 2
          let centerY = this.canvas.height / 2
    
          // Aplica la transformación centrada y escalada
          this.ctx.translate(centerX, centerY);   // Mueve el origen al centro del canvas
          this.ctx.setTransform(scaleFactor, 0, 0, scaleFactor, -centerX * (1 - t) + (Math.cos(Math.PI * 1 / t * 500) * 20) * (1 - t), (translateY + centerY) * (1 - t))
    
        }, () => {
          this.ctx.setTransform(1, 0, 0, 1, 0, 0);
          this.ctx.globalAlpha = 1
          this.state = this.STATES.DISPLAY_CURRENT_FICHAS
        })
    
        this.ESCENAS.FICHA_DROP = new Escena(this.ctx, (t) => {
          this.currentFicha.setOverFill("#0000")
          this.canvas.classList.remove('hover')
          this.currentFicha.isHovereable = false
          this.fichaBehaviour.targetY = this.fichaBehaviour.currentCasillero.pos.y + this.tablero.cellSize - this.currentFicha.size
          if (this.currentFicha.pos.y + this.currentFicha.size / 2 < this.fichaBehaviour.targetY) {
            this.currentFicha.addPos(0, 15)
          } else {
            this.currentFicha.updatePos(this.fichaBehaviour.currentCasillero.pos.x + this.fichaBehaviour.currentCasillero.offset, this.fichaBehaviour.currentCasillero.pos.y + this.fichaBehaviour.currentCasillero.offset)
          }
    
    
          
    
          
          
          this.FICHAS_EN_JUEGO[this.currentEquipo].forEach((ficha, i) => {
            if (this.fichaBehaviour.currentFichaIndex > i) {
              ficha.updatePos(ficha.pos.x, ficha.originalPosition.y - (15 * t))
            }
          })
    
          
          
        }, () => {
          this.fichaBehaviour.currentCasillero.endedFall = true
          this.state = this.STATES.DISPLAY_CURRENT_FICHAS
          this.FICHAS_EN_JUEGO[this.currentEquipo].splice(this.fichaBehaviour.currentFichaIndex,1)
          this.FICHAS_EN_JUEGO[this.currentEquipo].forEach(ficha => ficha.updateOriginalPosition())
          this.currentFicha = null
          this.switchTurn()
    
        })
    
        this.ESCENAS.ANIMATE_CLICPARAEMPEZAR = new Escena(this.ctx, (t) => {
          this.UI.CLICPARAEMPEZAR.setOpacity(1 - t)
        })
    
        this.ESCENAS.DISPLAY_CURRENT_FICHAS = new Escena(this.ctx, (t => {
          this.FICHAS_EN_JUEGO[this.currentEquipo].map( ficha => {
            ficha.setOverFill(`rgba(255,255,255, ${(1 - t) **2 - .5})`)
          })
    
          this.currentFicha?.setOverFill("#0008")
        }))
    
        this.ESCENAS.ANIMATE_HINTS = new Escena(this.ctx, (t => {
          this.tablero.setHintColor(`rgba(255,255,255,${(1 - t) **2 - .5})`)
        }))

      }

      update() {

        this.ctx.fillStyle = '#000'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    
        // MENU DIBUJADO

        if (this.state == this.STATES.MENU) {
            this.UI.MENU.draw()
            this.UI.TITULO.draw()
            this.UI.CLICPARAEMPEZAR.draw()
            this.ESCENAS.ANIMATE_CLICPARAEMPEZAR.animate(2)
        }
    
        // SELECCION CANTIDAD DE FICHAS MENU

        if(this.state == this.STATES.SELECTION_FICHA_MENU){
            this.UI.FONDO.draw()
            this.UI.TITULO_PEQUENIO.draw()
            this.UI.TITULO_CANTIDAD_FICHAS.draw()
            this.UI.SELECCION_FICHAS[4].draw();
            // this.UI.CUATROFICHAS.draw();
            // this.UI.CUATROFICHAS.draw();
            // this.UI.CINCOFICHAS.draw();
            // this.UI.SEISFICHAS.draw();
        }
        
        // if (this.state == this.STATES.TRANSITION_MENU_SELECT_MODE) {
        //   this.UI.MENU.draw()
        //   this.UI.SELECTMODE[4].draw()
        //   this.UI.SELECTMODE[5].draw()
        //   this.UI.SELECTMODE[6].draw()
        //   this.UI.SELECTMODE[7].draw()
        //   this.ESCENAS.TRANSITION_MENU_SELECT_MODE.animate(0)
        // }
    
        if (this.state == this.STATES.SELECT_MODE) {
          this.UI.SELECTMODE[4].draw()
          this.UI.SELECTMODE[5].draw()
          this.UI.SELECTMODE[6].draw()
          this.UI.SELECTMODE[7].draw()
        }
    
        if (this.state == this.STATES.SELECT_FICHA) {
          this.newGame(this.gameSettings.columnas, this.gameSettings.rows, 'REBELDE', 'IMPERIO')
          this.state = this.STATES.STARTING
        }
    
    
        if (this.state == this.STATES.STARTING) {
          this.tablero.draw()
          this.EQUIPOS_EN_JUEGO.forEach(equipo => {
            this.FICHAS_EN_JUEGO[equipo].forEach(ficha => {
              ficha.draw()
            })
          })
          this.ESCENAS.INICIA_TABLERO.animate(5)
        }
        if (this.state == this.STATES.FICHA_DROP) {
          this.currentFicha.draw()
          this.EQUIPOS_EN_JUEGO.forEach(equipo => {
            this.FICHAS_EN_JUEGO[equipo].forEach(ficha => {
              ficha.draw()
            })
          })
          this.tablero.draw()
          this.ESCENAS.FICHA_DROP.animate(.5)
        }
    
        if (this.state == this.STATES.DISPLAY_CURRENT_FICHAS) {            
          this.tablero.draw()
          this.EQUIPOS_EN_JUEGO.forEach(equipo => {
            this.FICHAS_EN_JUEGO[equipo].forEach(ficha => {
              ficha.draw()
            })
          })
    
          this.ESCENAS.DISPLAY_CURRENT_FICHAS.animate(.5)
          
        }
    
        if (this.state == this.STATES.GAME) {
          
          this.tablero.draw()
          this.ESCENAS.ANIMATE_HINTS.animate(1)
          this.EQUIPOS_EN_JUEGO.forEach(equipo => {
            this.FICHAS_EN_JUEGO[equipo].forEach(ficha => {
              if (!ficha.isClicked) {
                ficha.setOverFill('#0000')
              }
              ficha.draw()
            })
          })
    
        }    
    
      }

      switchTurn() {
        this.fichaBehaviour.currentTurn = this.fichaBehaviour.counter % this.EQUIPOS_EN_JUEGO.length
        this.currentEquipo = this.EQUIPOS_EN_JUEGO[this.fichaBehaviour.currentTurn]
        this.FICHAS_EN_JUEGO[this.currentEquipo].map(ficha => { ficha.isHovereable = true })
    
        this.fichaBehaviour.counter++
    
      }
    
      newGame(columns = 7, rows = 6, ...teams) {
    
    
        this.EQUIPOS_EN_JUEGO = []
        this.EQUIPOS_EN_JUEGO.push(teams[0])
        this.EQUIPOS_EN_JUEGO.push(teams[1])
    
        this.FICHAS_EN_JUEGO[this.EQUIPOS_EN_JUEGO[0]] = []
        this.FICHAS_EN_JUEGO[this.EQUIPOS_EN_JUEGO[1]] = []
    
        for (let i = columns * rows; i > 0; i--) {
          this.FICHAS_EN_JUEGO[this.EQUIPOS_EN_JUEGO[0]].push(new Ficha(this.EQUIPOS_EN_JUEGO[0], 100, this.canvas.height - 200 + (i * 15), this.ctx))
          this.FICHAS_EN_JUEGO[this.EQUIPOS_EN_JUEGO[1]].push(new Ficha(this.EQUIPOS_EN_JUEGO[1], this.canvas.width - 100 - Ficha.size, this.canvas.height - 200 + (i * 15), this.ctx))
        }
    
        this.switchTurn()
    
    
    
        this.state = this.STATES.STARTING
    
        const imagenesCasilleros = []
        for (let i = 0; i < 3; i++) {
          let img = new Image()
          img.src = `./img/juego/casillero-${i}.png`
          imagenesCasilleros.push(img)
    
        }
        this.tablero = new Tablero(columns, rows, imagenesCasilleros, undefined, undefined, this.ctx)
        this.tablero.centerOnScreen(this.canvas.width, this.canvas.height)
        this.tablero.setMatrix()
    
    
    
    
    
      }
    
    
    
      mouseMove({ layerX = 0, layerY = 0 }) {
        let { x: canvasXOffset, y: canvasYOffset } = this.canvas.getBoundingClientRect();
    
        this.mouse.x = Math.floor(layerX - canvasXOffset);
        this.mouse.y = Math.floor(layerY - canvasYOffset);
    
        if (this.state == this.STATES.MENU) {
          this.UI.CLICPARAEMPEZAR.mouseHover(this.mouse.x, this.mouse.y)
        }
    
        if (this.state == this.STATES.SELECT_MODE) {
          this.UI.SELECTMODE[4].mouseHover(this.mouse.x, this.mouse.y)
          this.UI.SELECTMODE[5].mouseHover(this.mouse.x, this.mouse.y)
          this.UI.SELECTMODE[6].mouseHover(this.mouse.x, this.mouse.y)
          this.UI.SELECTMODE[7].mouseHover(this.mouse.x, this.mouse.y)
        }
    
        if (this.state == this.STATES.DISPLAY_CURRENT_FICHAS) {
    
          for (let i = this.FICHAS_EN_JUEGO[this.currentEquipo].length - 1; i > 0; i--) {
            let ficha = this.FICHAS_EN_JUEGO[this.currentEquipo][i]
            const isMouseOver = ficha.hasMouseOver(this.mouse.x, this.mouse.y)
            ficha.isHover = isMouseOver
            if (isMouseOver) {
              this.canvas.classList.add('hover');
              this.currentFicha = ficha
              this.currentFicha.isHover = true
              this.fichaBehaviour.currentFichaIndex = i
              break;
            } else {
              if (this.currentFicha) {
                this.currentFicha.isHover = false
              }
              this.fichaBehaviour.currentFichaIndex = -1
              this.canvas.classList.remove('hover');
              this.currentFicha = null
            }
          }
    
          
        }
    
        if (this.state == this.STATES.GAME) {
          if (this.currentFicha && this.currentFicha.isClicked) {
            this.currentFicha.setOverFill("#0008")
            this.currentFicha.updatePos(this.mouse.x - this.currentFicha.size / 2, this.mouse.y - this.currentFicha.size / 2);
    
            let isEnteringFromLeftOrRight = (
              this.mouse.x + this.currentFicha.size/2 >= this.tablero.pos.x &&
              this.mouse.x - this.currentFicha.size/2 <= this.tablero.pos.x + this.tablero.columns * this.tablero.cellSize &&
              this.mouse.y > this.tablero.pos.y
            )
    
            this.canvas.classList.toggle('illegal', isEnteringFromLeftOrRight)
    
            if (isEnteringFromLeftOrRight) {
              this.currentFicha.updatePos(this.mouse.x < this.canvas.width / 2 ? this.mouse.x - (this.mouse.x - this.tablero.pos.x + this.currentFicha.size) : this.tablero.getEndPos().x, this.currentFicha.pos.y)
            }
    
            let [column, zone] = this.tablero.isInsideColumn(this.mouse.x, this.mouse.y)
    
            if (column >= 0) {
              this.fichaBehaviour.currentColumn = column
              this.currentFicha.setOverFill('#0008')
              this.currentFicha.updatePos(
                (zone.x.start + zone.x.end) / 2 - this.currentFicha.size / 2,
                zone.y.end - this.currentFicha.size - 10
              );
            } else {
              this.fichaBehaviour.currentColumn = undefined;
            }
    
    
    
    
          }
        }
    
    
    
    
      }
    
      mouseUp(e) {
    
        if (this.state == this.STATES.GAME) {
    
          this.tablero.setHintColor('#0000')
          this.state = this.STATES.DISPLAY_CURRENT_FICHAS
    
          if (this.currentFicha != null) {
            this.currentFicha.isClicked = false
          }
          if (this.fichaBehaviour.currentColumn >= 0 && this.fichaBehaviour.currentColumn <= this.tablero.columns) {
            let row = this.tablero.addFicha(this.fichaBehaviour.currentColumn, this.currentFicha)
            if (row >= 0) {
    
              this.fichaBehaviour.currentCasillero = this.tablero.getCasillero(this.fichaBehaviour.currentColumn, row)
              this.state = this.STATES.FICHA_DROP
            }
            this.fichaBehaviour.currentColumn = undefined
          }
    
          if (this.canvas.classList.contains('illegal')) {
            // this.currentFicha.updatePos()
            this.canvas.classList.remove('illegal')
          }
    
          this.canvas.classList.remove('grabbing')
    
        }
    
      }
    
      mouseDown(e) {
    
        if (this.state == this.STATES.MENU) {
          this.UI.CLICPARAEMPEZAR.mouseClick()
        }
    
        if (this.state == this.STATES.SELECT_MODE) {
          this.UI.SELECTMODE[4].mouseClick()
          this.UI.SELECTMODE[5].mouseClick()
          this.UI.SELECTMODE[6].mouseClick()
          this.UI.SELECTMODE[7].mouseClick()
        }
    
        if (this.state == this.STATES.DISPLAY_CURRENT_FICHAS) {
    
          if (this.currentFicha && this.currentFicha.isHover && this.currentFicha.isHovereable) {        
            this.currentFicha.isClicked = true
            this.canvas.classList.add('grabbing')
            this.state = this.STATES.GAME
          }
        }
    
      }
    
      mouseLeave(e) {
        if (this.state == this.STATES.GAME) {
          this.currentFicha.isClicked = false
          this.currentFicha.isHover = false
        }
      }
    

}