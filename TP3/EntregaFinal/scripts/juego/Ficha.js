class Ficha extends Figure {
  constructor(posX, posY, radius, fill, context, player, imageURL) {
      super(posX, posY, fill, context);   
      this.radius = radius;
      this.player = player;
      this.disponible = true;
      this.image = new Image();
      this.imageURL = imageURL;
      this.velocidadY = 0; // Velocidad vertical inicial
      this.gravedad = 0.5; 
      this.enCaida = false; 
  }
 
   // Método para actualizar la posición de la ficha
   actualizar() {
    if (this.enCaida) {
        this.velocidadY += this.gravedad; 
        this.y += this.velocidadY; 

        if (this.y + this.radio >= Tablero.rectHeight) {
            this.y = Tablero.rectHeight - this.radio; 
            this.enCaida = false; 
            this.velocidadY = 0; 
            this.disponible = false; 
        }
    }
}
  draw() {
    
        super.draw(); // Llama al método de la clase padre para dibujar la figura base
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
    
        if (this.resaltado === true) {
            this.ctx.strokeStyle = this.resaltadoEstilo;
            this.ctx.lineWidth = 5;
            this.ctx.stroke();
        }
    
        // Dibuja la imagen si ha sido cargada
        if (this.image.src) {
            this.ctx.drawImage(this.image, this.posX - this.radius, this.posY - this.radius, this.radius / 0.5, this.radius / 0.5);
        }
    
    
     
      //cuando creo la ficha le asigno la url de la imagen, solo accede una vez
      if(this.image.src === ""){
          this.image.src = this.imageURL;
          let cargarImg = function (){
              this.ctx.drawImage(this.image, this.posX - this.radius, this.posY - this.radius, this.radius / .5,
              this.radius / .5);
          }
          this.image.onload = cargarImg.bind(this);
      }else{
          this.ctx.drawImage(this.image, this.posX - this.radius, this.posY - this.radius, this.radius / .5,
              this.radius / .5);
      }

      this.ctx.closePath();
  }
  
  getRadius() {
      return this.radius;
  }
  
  isPointInside(x,y){
      if(this.disponible == true){
      let _x = this.posX -x;
      let _y = this.posY -y;
      
      return Math.sqrt(_x * _x + _y * _y) < this.radius;
      }
      return false;
  }

  isDisponible(){
      return this.disponible;
  }

  setDisponible(boolean){
      this.disponible = boolean;
  }

  getPlayerId(){
      return this.player.getId();
  }

}