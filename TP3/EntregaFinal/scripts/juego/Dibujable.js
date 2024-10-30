class Dibujable {

  constructor(ctx = new CanvasRenderingContext2D(), xPos = 0, yPos = 0){
    this.ctx = ctx
    this.pos = {
      x : xPos,
      y : yPos
    }    
  }

  draw(){}

  updatePos(x = 0, y = 0){
    this.pos.x = x
    this.pos.y = y
  }

  addPos(x = 0, y = 0){
    this.pos.x += x
    this.pos.y += y
  }
}