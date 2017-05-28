class Point {
  constructor(context, startingPos){
    this.c = context;
    this.startingPos = startingPos;
  }

  draw(){
    this.c.beginPath();
    this.c.arc(this.startingPos[0], this.startingPos[1], 5, 0, Math.PI * 2, false);
    this.c.fillStyle = "white";
    this.c.stroke();
  }

  move(direction){
    if (direction === "right"){
      this.startingPos[0] += 1;
    }
    else if (direction === "left"){
      this.startingPos[0] -= 1;
    }else if (direction === "up"){
      this.startingPos[1] -= 1;
    }else if (direction === "down"){
      this.startingPos[1] += 1;
  }
  this.draw();
  }
}
export default Point;
