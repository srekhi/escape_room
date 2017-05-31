import Wall from './wall';
// import LEVELS from './levels_structure';
import Level from './level';
import Point from './point';
import Ray from './ray';
import Board from './board';
import Monster from './monster';

const LEVELS = {
  1: {
    walls:
    [
        [0, 0, 0.55, 0.25],
        [0, 0.3, 0.7, 0.25],
        [0.25, 0, 0.4, 0.25],
        [0, 0, 0.02, 1],
        [0.8, 0, 0.01, 1]
    ],
    pointStartPos: [.1, .27],
    monsterPositions: [
      [0.7, 0.20],
    ]
  },
  2: {
    walls: [
      [0, 0.25, 0.8, 0.2],
      [0.6, 0.6, 0.4, 0.2],
      [0, 0.45, 0.4, 0.55],
      [0.4, 0.9, 0.2, 0.1]
    ],
    pointStartPos: [0.1, 0.1],
    monsterPositions: [
      [],
    ]
  },
  3: {
    walls: [
      [0, 0.1, 0.5, 0.1],
      [0.6, 0.1, 0.4, 0.1],
      [0.2, 0.3, 0.8, 0.5],
      [0.3, 0.7, 0.1, 0.2],
      [0.6, 0.6, 0.2, 0.35]
    ],
    pointStartPos: [0.05, 0.05],
    monsterPositions: [
      [0.8, 0.3],
      [0.5, 0.81],
    ]
  }
};

class Game {
  constructor(context, canvas, levelPassed, playerEaten) {
    this.context = context;
    this.levelCount = 1;
    this.levelPassed = levelPassed;

    this.monsterPositions = LEVELS[this.levelCount].monsterPositions;
    this.canvas = canvas;
    this.point = new Point(context, canvas, LEVELS[this.levelCount].pointStartPos);
    this.board = new Board(context, canvas, this.point, LEVELS[this.levelCount].walls);
    this.monsters = this.createMonsters();
    this.board.monsters = this.monsters;
    this.playerEaten = playerEaten;
    this.keyStatus = {};
    this.createEventListeners();
    this.step = this.step.bind(this);
    this.step();
  }

  createMonsters(){
    return this.monsterPositions.map(monsterPos => {
      return new Monster(this.context, this.canvas, monsterPos, this.board);
    });
  }
  createEventListeners(){
    const self = this;
    window.addEventListener("keydown", event => {
      if (!event.metaKey && !event.ctrlKey){
        this.keyStatus[event.key.toLowerCase()] = true;
      }
    });

    window.addEventListener("keydown", event => {
      if (event.key === " ") {
          event.preventDefault();
          this.point.makeSound(this.board); //needs to be separate JS effect from point.
        }
    });
    window.addEventListener("keyup", event => {
      // debugger;.
      self.keyStatus[event.key.toLowerCase()] = false;
    });
  }

  analyzeKeyMap(){
    let direction = this.assignDirection();
    if (!this.collides(this.point.nextPos(direction))){
        this.point.move(direction);
      }
    }


  moveMonsters(){
    this.monsters.forEach(monster => monster.move());
  }

  step(){
    //clear out the board
    // this.keyStatus = {};
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.analyzeKeyMap();
    this.moveMonsters();
    this.board.draw(); //will redraw board based on position of everything.
    if (this.point.hasEscaped()) {
      this.keyStatus = {};
      this.levelPassed(this.levelCount);
      this.levelCount += 1;
      this.monsterPositions = LEVELS[this.levelCount].monsterPositions;
      this.point = new Point(this.context, this.canvas, LEVELS[this.levelCount].pointStartPos);
      this.board = new Board(this.context, this.canvas, this.point, LEVELS[this.levelCount].walls);
      this.monsters = this.createMonsters();
      this.board.monsters = this.monsters;

    } else if (this.point.eaten) {

      this.keyStatus = {};
      this.playerEaten(this.levelCount);
      this.monsterPositions = LEVELS[this.levelCount].monsterPositions;
      this.point = new Point(this.context, this.canvas, LEVELS[this.levelCount].pointStartPos);
      this.board = new Board(this.context, this.canvas, this.point, LEVELS[this.levelCount].walls);
      this.monsters = this.createMonsters();
      this.board.monsters = this.monsters;
    }
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
