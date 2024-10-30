class ResizedImage extends Dibujable {
  constructor(img = Image, width = 0, height = 0, xPos = 0, yPos = 0, ctx = CanvasRenderingContext2D) {
    super(ctx, xPos, yPos)
    this.img = img;
    this.width = width;
    this.height = height;
    this.opacity = 1


    // Crear un canvas propio
    this.offscreenCanvas = document.createElement('canvas');
    this.offscreenCanvas.width = this.width;
    this.offscreenCanvas.height = this.height;
    this.offscreenCtx = this.offscreenCanvas.getContext('2d');

    this.startYPos = -this.height;  // Posición inicial fuera de pantalla
    this.targetYPos = yPos;  // Posición final

  }

  draw() {
    super.draw();
    if (this.img.complete) {
      // Dibujar en el canvas propio
      this.offscreenCtx.clearRect(0, 0, this.width, this.height);  // Limpiar el canvas propio
      this.offscreenCtx.globalAlpha = this.opacity;  // Aplicar opacidad
      this.offscreenCtx.drawImage(this.img, 0, 0, this.width, this.height);  // Dibujar imagen en canvas propio

      // Luego, dibujar el canvas propio en el canvas original
      this.ctx.drawImage(this.offscreenCanvas, this.pos.x, this.pos.y, this.width, this.height);
    }

  }
}