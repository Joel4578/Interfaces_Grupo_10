class Figure {
  constructor(posX, posY, fill, context) {
      this.posX = posX;
      this.posY = posY;
      this.fill = fill;
      this.resaltado = false;
      this.resaltadoEstilo = "red";
      this.ctx = context;
      
  }
  /*set fill porque si quiero
  modificar la variable fill
  y no por el  constructor */

  setFill(fill) {
      this.fill = fill;
  }
  /*uso set position cuando vaya modiendo
  las figuras le voy a tener que cambiar su posicion 
  original a una nueva*/
  setPosition(x,y){
      this.posX = x;
      this.posY = y;
  }
  /*para saber la posicion actual de la figuras*/
  getPosition() {
      return {
          x: this.getPosX(),
          y: this.getPosY()
      };
  }

  getPosX() {
      return this.posX;
  }
  getPosY() {
      return this.posY;
  }
  getFill() {
      return this.fill;
  }

  


  draw() {
    this.ctx.fillStyle = this.fill;
    this.ctx.beginPath();
    // Por ejemplo, si estás dibujando un círculo
    this.ctx.arc(this.posX, this.posY, this.radio, 0, Math.PI * 2);
    this.ctx.fill();
}

  setResaltado(resaltado){
      this.resaltado = resaltado;
  }
  isPointInside(x, y) {
    const dx = x - this.posX;
    const dy = y - this.posY;
    return Math.sqrt(dx * dx + dy * dy) < this.radio; // asumiendo que tienes un atributo `radio`
}


}