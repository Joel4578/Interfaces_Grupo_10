class Casillero extends Dibujable {
  constructor(img = ResizedImage, xPos = 0, yPos = 0, ctx = CanvasRenderingContext2D) {
    super(ctx, xPos, yPos)
    this.img = img
    this.jugador = null
    this.endedFall = false
    this.offset = 12.5
  }

  draw() {
    super.draw()
    if (this.endedFall) {
      this.jugador?.draw()
    }
    this.img.draw()
  }

  setJugador(jugador = Ficha) {    
    this.jugador = new Ficha(jugador.equipo, undefined, undefined, this.ctx)

    this.jugador.isHovereable = false

    this.jugador.updatePos(this.pos.x + this.offset, this.pos.y + this.offset)
  }
}