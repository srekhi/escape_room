class Point {
  constructor(context, startingPos){
    this.c = context;
    this.pos = startingPos;
    this.dx = 1;
    this.dy = 1;
    this.moving = false;
    this.draw();
    this.animate = this.animate.bind(this);
  }

  draw(){
    this.c.beginPath();
    this.c.arc(this.pos[0], this.pos[1], 5, 0, Math.PI * 2, false);
    this.c.fillStyle = "white";
    this.c.stroke();
  }

  move(direction){
    this.moving = true;
    if (direction === "right"){
      this.pos[0] += 1;
    }
    else if (direction === "left"){
      this.pos[0] -= 1;
    }else if (direction === "up"){
      this.pos[1] -= 1;
    }else if (direction === "down"){
      this.pos[1] += 1;
    }
  this.draw();
  }

  stopMoving(){
    this.moving = false;
    window.cancelAnimationFrame(window.animationFrameId);
  }

  animate(point, direction){
    point.move(direction);
    window.animationFrameId = window.requestAnimationFrame(() =>{
      if (this.moving){
        this.animate(point, direction);
      }
    });
  }

  handleCollision(){

  }


}
export default Point;
