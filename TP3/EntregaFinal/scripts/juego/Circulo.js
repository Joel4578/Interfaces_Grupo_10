class Circulo extends Dibujable{
  constructor(radius = 0, xPos = 0, yPos = 0, ctx = new CanvasRenderingContext2D()){
    super(ctx, xPos, yPos)

    this.radius = radius
    this.fill = '#0000'
  }

  draw(){
    super.draw()

      this.ctx.fillStyle = this.fill
      this.ctx.beginPath()
      this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI)
      this.ctx.closePath()
      this.ctx.fill()
    
  }
}