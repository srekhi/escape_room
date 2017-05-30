import Game from './game';
import Ray from './ray';
import Board from './board';
class Point {
  constructor(context, canvas, startingPos){
    this.c = context;
    this.pos = [startingPos[0] * canvas.width, startingPos[1] * canvas.height];
    this.dx = 5;
    this.dy = -5;
    this.moving = false;
    this.canvas = canvas;
    // this.board = board;
    // this.draw();
    // this.animate = this.animate.bind(this);
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
    this.c.arc(this.pos[0], this.pos[1], 2, 0, Math.PI * 2, false);
    this.c.fillStyle = "white";
    this.c.strokeStyle = "white";

    this.c.stroke();
  }

  hasEscaped(){
      // if point is outside of cavas, return false, else true
      return (this.pos[0] > this.canvas.width
        || this.pos[0] < 0
        || this.pos[1] > this.canvas.height
        || this.pos[1] < 0);
  }

  move(direction){
    let delta;
    this.moving = true;
    delta = this.movementDeltas[direction];
    this.pos = this.nextPos(direction);
    this.draw();
  }

  makeSound(board){
    let counter = 10;
    Ray.DIRECTIONS.forEach(dir => {
      new Ray(this.c, 100, this.pos, dir[0] * 3, dir[1] * 3, board);
    });

      // let ray = new Ray(this.c, this.pos, 1, 1, board);
      //
      // ray.grow();
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

  // animate(direction){
  //   // this.c.clearRect(0, 0, innerHeight, innerWidth);
  //   this.move(direction);
  //   window.animationFrameId = window.requestAnimationFrame(() =>{
  //     if (this.moving){
  //       this.animate(direction);
  //       if (this.collides()) this.stopMoving();
  //     }
  //   });
  // }
}
export default Point;
