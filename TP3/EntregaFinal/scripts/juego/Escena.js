class Escena{
  constructor(ctx = CanvasRenderingContext2D, callback = (t) => {}, end = () => {} ){
    this.ctx = ctx
    this.callback = callback
    this.startTime = -1
    this.end = end
  }

  animate(duration = 0){
    if (this.startTime < 0) {
      this.startTime = Date.now() / 1000
    }

    if (Date.now() / 1000 - this.startTime < duration) {
      let normalized = (Date.now() / 1000 - this.startTime) / duration      
      this.callback(normalized)
    }else{
      this.end()
      this.startTime = -1
    }
  }

}