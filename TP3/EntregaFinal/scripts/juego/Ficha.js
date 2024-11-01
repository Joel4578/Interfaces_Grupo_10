class Ficha extends Figure {
  constructor(posX, posY, radius, fill, context, player, imageURL) {
      super(posX, posY, fill, context);   
      this.radius = radius;
      this.player = player;
      this.disponible = true;
      this.image = new Image();
      this.imageURL = imageURL;
  }
 
  draw() {
      /*me traigo todos los valores de las propiedades
      del constructor de la clase padre
       y se la asigno a la funcion dibujar*/
      super.draw();
      this.ctx.beginPath();
      this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
      this.ctx.fill();
      
      if(this.resaltado === true){
          
          this.ctx.strokeStyle = this.resaltadoEstilo;
          this.ctx.lineWidth = 5;
          this.ctx.stroke();
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