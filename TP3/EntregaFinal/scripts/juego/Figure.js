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
  }
  setResaltado(resaltado){
      this.resaltado = resaltado;
  }
  /*para saber si el mouse esta dentro de la figura */
  isPointInside(x,y) { };

  

}