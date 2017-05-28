import Wall from './wall';
import Level from './level';
import Point from './point';
import Ray from './ray';
import Board from './board';

class Game {
  constructor(context, board, point) {
    this.context = context;
    this.board = board;
    this.point = point;

    this.point.draw();
    this.keyStatus = {}; //keep tally of which keys are pressed down.
    // this.directions = { "w": "up", "s":"down", "d":"right", "a": "left"};
    this.createEventListeners();
    this.step = this.step.bind(this);
    this.step();
  }
  createEventListeners(){
    const self = this;
    window.addEventListener("keydown", event => {
      this.keyStatus[event.key] = true;
    });

    window.addEventListener("keydown", event => {
      if (event.key === " ") {
          event.preventDefault();
          this.point.makeSound(this.board); //needs to be separate JS effect from point.
        }
    });
    window.addEventListener("keyup", event => {
      this.keyStatus[event.key] = false;
    });
  }

  analyzeKeyMap(){
    let direction = this.assignDirection();
    if (!this.collides(this.point.nextPos(direction))){
        this.point.move(direction);
      }
    }

  step(){
    //clear out the board
    // this.keyStatus = {};
    this.context.fillStyle = "#222";
    this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    this.analyzeKeyMap();
    this.board.draw(); //will redraw board based on position of everything.
    requestAnimationFrame(this.step);
  }

  assignDirection() {
      if (this.keyStatus["w"] && this.keyStatus["a"]) {
          return "NW";
      } else if (this.keyStatus["a"] && this.keyStatus["s"]){
          return "SW";
      } else if (this.keyStatus["w"] && this.keyStatus["d"]){
          return "NE";
      } else if (this.keyStatus["d"] && this.keyStatus["s"]){
          return "SE";
      } else if (this.keyStatus["a"]) {
          return "W";
      } else if (this.keyStatus["d"]) {
          return "E";
      } else if (this.keyStatus["w"]) {
          return "N";
      } else if (this.keyStatus["s"]) {
          return "S";
      } else{
        return "";
      }
    }

  collides(coords) {
    return this.board.collides(coords);
  }
}

export default Game;



//   let p = new Point(ctx, [0, window.innerHeight / 2 + 25] );
//   let level1 = new Level(ctx, walls);
//   level1.draw();
//   p.draw();
//   document.addEventListener("keypress", event => {
//     if (event.key === "w"){
//       animate(p,"up");
//     }else if (event.key === "a") {
//       animate(p,"left");
//     }else if (event.key === "s"){
//       animate(p,"down");
//     }else if (event.key === "d"){
//       animate(p,"right");
//     }else if (event.key === " "){
//       let ray = new Ray(ctx, p.pos);
//       ray.grow();
//     }
//   });
// });
//
//
// function animate(point, direction){
//   console.log(direction);
//   point.move(direction);
//   requestAnimationFrame(() =>{
//     animate(point, direction);
//   });
// }
