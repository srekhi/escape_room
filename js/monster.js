import Game from './game';
import Ray from './ray';
import Board from './board';
class Monster {
  constructor(context, canvas, startingPos, board){
    this.c = context;
    this.pos = [startingPos[0] * canvas.width, startingPos[1] * canvas.height];
    this.dx = 5;
    this.dy = -5;
    this.awake = false;
    this.canvas = canvas;
    this.board = board;
    this.timer = false;
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
    if (this.awake){
    this.c.beginPath();
    this.c.arc(this.pos[0], this.pos[1], 5, 0, Math.PI * 2, false);
    this.c.fillStyle = "red";
    this.c.strokeStyle = "red";
    this.c.closePath();
    this.c.stroke();
      if (!this.timer){
        setInterval(() => this.makeSound(this.board), 1000); //add pulsing effect for monster;
        this.timer = true;
      }
    }
  }

  move(){ // goal is to move toward the player
    let delta;
    if (this.awake){
     delta = [
      Math.ceil((this.board.point.pos[0] - this.pos[0])),
      Math.ceil((this.board.point.pos[1] - this.pos[1]))
    ];
    let deltaMagnitude = Math.sqrt(Math.pow(delta[0], 2) + Math.pow(delta[1], 2));
    let unitVector = delta.map(dir => dir/deltaMagnitude);
    let nextPos = this.pos.map((posDir, index) => posDir + unitVector[index]);
    if (!this.board.collides(nextPos)){
      this.pos = nextPos;
    }
  }
}

  makeSound(board){
    Ray.DIRECTIONS.forEach(dir => {
      new Ray(this.c, 100, this.pos, dir[0] * 3, dir[1] * 3, board, true);
    });

  }

  // stopMoving(){
  //   this.moving = false;
  //   window.cancelAnimationFrame(window.animationFrameId);
  // }

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
export default Monster;
