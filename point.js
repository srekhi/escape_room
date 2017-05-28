import Game from './game';
class Point {
  constructor(context, startingPos){
    this.c = context;
    this.pos = startingPos;
    this.dx = 5;
    this.dy = -5;
    this.moving = false;
    this.draw();
    this.animate = this.animate.bind(this);
    this.deltas = { "right": this.dx, "left": this.dx * -1, "up": this.dy, "down": -1 * this.dy};
  }

  draw(){
    this.c.beginPath();
    this.c.arc(this.pos[0], this.pos[1], 5, 0, Math.PI * 2, false);
    this.c.fillStyle = "blue";
    this.c.strokeStyle = "blue";

    this.c.stroke();
  }

  move(direction){
    let delta;
    this.moving = true;
    delta = this.deltas[direction];
    if (direction === "right" || direction === "left"){
      this.pos[0] += delta;
    }
    else if (direction === "up" || direction === "down"){
      this.pos[1] += delta;
    }
    this.draw();
  }

  nextPos(direction){
    if (direction === "right" || direction === "left"){
      return [this.pos[0] + this.deltas[direction], this.pos[1]];
    }
    else if (direction === "up" || direction === "down"){
      return [this.pos[0], this.pos[1] + this.deltas[direction]];
    } else {
      return this.pos;
    }
  }

  stopMoving(){
    this.moving = false;
    window.cancelAnimationFrame(window.animationFrameId);
  }

  collides(){
    return Game.collides(this.pos);
  }

  animate(direction){
    // this.c.clearRect(0, 0, innerHeight, innerWidth);
    this.move(direction);
    window.animationFrameId = window.requestAnimationFrame(() =>{
      if (this.moving){
        this.animate(direction);
        if (this.collides()) this.stopMoving();
      }
    });
  }
}
export default Point;
