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
                },
                5 : {
                default : getImage('imgs/cuatro-en-linea/5-EN-LINEA.png'),
                },
                6 : {
                default : getImage('imgs/cuatro-en-linea/6-EN-LINEA.png'),
                }
            }
        } 

        // DEFINIMOS LOS ESTADOS DE NUESTRO JUEGO
    
        this.STATES = {
            MENU: 'menu',
            SELECCIONAR_MODO: 'selecciona entre los diferentes modos',
            SELECCION_PERSONAJE: 'seleccionar personaje',
            GAME: 'game',
            STARTING: 'starting',
            WINNER: 'winner',
            TIE: 'tie',
            FICHA_DROP: 'ficha drop',
        }

        // ESTADO EN EL QUE COMIENZA (MENU)
    
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
            this.state = this.STATES.SELECCIONAR_MODO
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

        this.UI.SELECCION_FICHA = {
            4: new UIElement(new ResizedImage(this.IMGS.SELECCION_FICHAS[4].default, 167, 29, 0, 0, ctx), null, canvas.width / 2 - 94, canvas.height - 210, ctx),
            5: new UIElement(new ResizedImage(this.IMGS.SELECCION_FICHAS[5].default, 167, 29, 0, 0, ctx), null, canvas.width / 2 - 94, canvas.height - 140, ctx),
            6: new UIElement(new ResizedImage(this.IMGS.SELECCION_FICHAS[6].default, 167, 29, 0, 0, ctx), null, canvas.width / 2 - 94, canvas.height - 70, ctx)
        }
        
        this.UI.SELECCION_FICHA[4].onClick = () => {
            this.state = this.STATES.SELECCION_PERSONAJE
            this.gameSettings.fichasToWin = 4
            this.gameSettings.columnas = 7
            this.gameSettings.duration = this.gameSettings.columnas * this.gameSettings.rows * 10
            this.canvas.classList.remove('pointer')
        }

        this.UI.SELECCION_FICHA[4].onHover = () => {
            this.canvas.classList.add('pointer')
        }

        this.UI.SELECCION_FICHA[4].onHoverLeave = () => {
            this.canvas.classList.remove('pointer')
        }

        this.UI.SELECCION_FICHA[5].onClick = () => {
            this.state = this.STATES.SELECCION_PERSONAJE
            this.gameSettings.fichasToWin = 5
            this.gameSettings.columnas = 7
            this.gameSettings.duration = this.gameSettings.columnas * this.gameSettings.rows * 10
            this.canvas.classList.remove('pointer')
        }

        this.UI.SELECCION_FICHA[5].onHover = () => {
            this.canvas.classList.add('pointer')
        }

        this.UI.SELECCION_FICHA[5].onHoverLeave = () => {
            this.canvas.classList.remove('pointer')
        }

        this.UI.SELECCION_FICHA[6].onClick = () => {
            this.state = this.STATES.SELECCION_PERSONAJE
            this.gameSettings.fichasToWin = 6
            this.gameSettings.columnas = 7
            this.gameSettings.duration = this.gameSettings.columnas * this.gameSettings.rows * 10
            this.canvas.classList.remove('pointer')
        }

        this.UI.SELECCION_FICHA[6].onHover = () => {
            this.canvas.classList.add('pointer')
        }

        this.UI.SELECCION_FICHA[6].onHoverLeave = () => {
            this.canvas.classList.remove('pointer')
        }

        this.tablero
    
        this.mouse = {
            x: 0,
            y: 0,
        }

        this.ESCENAS = {}

        this.ESCENAS.ANIMATE_CLICPARAEMPEZAR = new Escena(this.ctx, (t) => {
            this.UI.CLICPARAEMPEZAR.setOpacity(1 - t)
        })

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

        if(this.state == this.STATES.SELECCIONAR_MODO){
            this.UI.FONDO.draw()
            this.UI.TITULO_PEQUENIO.draw()
            this.UI.TITULO_CANTIDAD_FICHAS.draw()
            this.UI.SELECCION_FICHA[4].draw()
            this.UI.SELECCION_FICHA[5].draw()
            this.UI.SELECCION_FICHA[6].draw()
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

            // DETECTA EL MOVIMIENTO SOBRE EL BOTON CLICPARACOMENZAR

        if (this.state == this.STATES.MENU) {
            this.UI.CLICPARAEMPEZAR.mouseHover(this.mouse.x, this.mouse.y)
        }

          // DETECTA EL MOVIMIENTO SOBRE LOS BOTONES DE SELECCION DE FICHAS

        if(this.state == this.STATES.SELECCIONAR_MODO){
            this.UI.SELECCION_FICHA[4].mouseHover(this.mouse.x, this.mouse.y)
            this.UI.SELECCION_FICHA[5].mouseHover(this.mouse.x, this.mouse.y)
            this.UI.SELECCION_FICHA[6].mouseHover(this.mouse.x, this.mouse.y)
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
    
            if(this.state == this.STATES.SELECCIONAR_MODO){
                this.UI.SELECCIONAR_MODO[4].mouseClick()
                this.UI.SELECCIONAR_MODO[5].mouseClick()
                this.UI.SELECCIONAR_MODO[6].mouseClick()
            }
        }
    
        mouseLeave(e) {
            if (this.state == this.STATES.GAME) {
            this.currentFicha.isClicked = false
            this.currentFicha.isHover = false
            }


        }

}