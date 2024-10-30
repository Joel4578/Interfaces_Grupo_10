class Ficha extends Dibujable{
  

  static size = 40

  constructor(equipo = "", xPos = 0, yPos = 0 ,ctx = CanvasRenderingContext2D){
    super(ctx, xPos, yPos)

    this.equipo = equipo


    this.size = Ficha.size
    this.image = getResizedImage(`./img/juego/ficha_${this.equipo}.png`, this.size, this.size, this.pos.x, this.pos.y, this.ctx)
    
    this.circle = new Circulo(this.size / 2, this.pos.x + this.size / 2, this.pos.y + this.size / 2, ctx)

    this.isHover = false
    this.isClicked = false
    this.isHovereable = true

    this.originalPosition = {
      x : xPos,
      y : yPos
    }
  }

  draw(){
    super.draw()
    this.image.draw()
    this.circle.draw()

  }

  updatePos(x = 0, y = 0){
    super.updatePos(x,y)
    this.image.updatePos(x,y)
    this.circle.updatePos(x + this.size / 2, y + this.size / 2)
  }
  
  addPos(x = 0, y = 0){
    super.addPos(x,y)
    this.image.addPos(x,y)
    this.circle.addPos(x + this.size / 2, y + this.size / 2)
  }

  hasMouseOver(x = 0, y = 0){
    
    let centerX = this.pos.x + this.size / 2;
    let centerY = this.pos.y + this.size / 2;
  
    let dx = x - centerX;
    let dy = y - centerY;
  
    let distance = Math.sqrt(dx ** 2 + dy ** 2);
  
    return distance < (this.size / 2 + 3);
  }

  setOverFill(fill = "#0000"){
    this.circle.fill = fill
  }

  updateOriginalPosition(){
    this.originalPosition = {
      x : this.pos.x,
      y : this.pos.y
    }
  }


}