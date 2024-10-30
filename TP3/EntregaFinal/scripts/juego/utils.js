function getImage(path = '') {
  let img = new Image()
  img.src = path

  return img
}

function getResizedImage(path = '', width = 0, height = 0, xPos = 0, yPos = 0, ctx = CanvasRenderingContext2D) {
  let img = getImage(path)
  let resized = new ResizedImage(img, width, height, xPos, yPos, ctx)

  return resized
}