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
    this.movementDeltas = {
      "NW": [-this.dx, this.dy],
      "SW": [-this.dx, -this.dy],
      "NE": [this.dx, this.dy],
      "SE": [this.dx, -this.dy],
      "W": [-this.dx, 0],
      "E": [this.dx, 0],
      "N": [0, this.dy],
      "S": [0, -this.dy]
     };
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
    delta = this.movementDeltas[direction];
    this.pos = this.nextPos(direction);
    this.draw();
  }

  makeSound(){
    console.log("WAVY");
    //make the rays here.
  }

  nextPos(direction){
    let delta;
    delta = this.movementDeltas[direction] || [0, 0]; //in case key pressed is irrelevant
    return this.pos.map((posDir, index) => posDir + delta[index]);
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