class Wall {
  constructor(x, y, width, height){
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.topLeft = [x, y];
    this.topRight = [x + width, y];
    this.bottomLeft = [x, y + height];
    this.bottomRight = [x + width, y + height];
  }

  draw(context){
    context.beginPath();
    context.fillStyle = "black";
    context.fillRect(this.x, this.y, this.width, this.height);
    context.closePath();
    context.stroke();
    // context.strokeRect(this.x, this.y, this.width, this.height);
  }
}

export default Wall;
