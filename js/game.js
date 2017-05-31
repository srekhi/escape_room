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
        // [0, 0.3, 0.7, 0.25],
        [0.2, 0.3, 0.5, 0.25],
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
      [0.0, 0.01, 1, 0.05],
      [0.0, 0.01, 0.01, 1],
      [0, 0.25, 0.8, 0.2],
      [0.6, 0.6, 0.4, 0.2],
      [0, 0.45, 0.4, 0.55],
      [0.4, 0.9, 0.2, 0.1],
      [0.9, 0, 0.2, 1]

    ],
    pointStartPos: [0.1, 0.1],
    monsterPositions: [
      [0.5, 0.5],
    ]
  },
  3: {
    walls: [
      [0, 0.1, 0.55, 0.1],
      [0, 0.01, 1, 0.01],
      [0, 0, 0.01, 1],
      [0.9, 0, 0.01, 1],
      [0.6, 0.1, 0.4, 0.1],
      [0.2, 0.3, 0.8, 0.5],
      [0.3, 0.7, 0.1, 0.2],
      [0.6, 0.6, 0.2, 0.35],
      [0, 0.98, 0.8, 0.01]

    ],
    pointStartPos: [0.05, 0.05],
    monsterPositions: [
      [0.8, 0.3],
      [0.5, 0.81],
      [0.1, 0.9]
    ]
  },
  4: {
    walls:[
      [0.1, 0.02, 1, 0.02],
      [0, 0, 0.2, 0.2],
      [0, 0.2, 0.2, 0.05],
      [0.3, 0.2, 0.5, 0.02],
      [0, 0.4, 0.2, 0.02],
      [0, 0.2, 0.1, 0.02],
      [0.1, 0.4, 0.05, 0.02],
      [0.2, 0.4, 0.5, 0.02],
      [0, 0, 0.01, 1],
      [0.9, 0, 0.01, 1],
      [0.6, 0.1, 0.4, 0.1],
      [0.2, 0.3, 0.2, 0.3],
      [0.2, 0.3, 0.2, 0.3],
      [0.3, 0.7, 0.1, 0.2],
      [0.6, 0.6, 0.4, 0.35],
      [0, 0.98, 0.8, 0.5]
    ],
    pointStartPos: [0.8, 0.05],
    monsterPositions: [
      [0.8, 0.3],
      [0.5, 0.81],
      [0.1, 0.9],
      [0.05, 0.5]

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
        if (event.key.startsWith("Arrow")) event.preventDefault();
        this.keyStatus[event.key] = true;
    });

    window.addEventListener("keydown", event => {
      if (event.key === " ") {
          event.preventDefault();
          this.point.makeSound(this.board); //needs to be separate JS effect from point.
        }
    });
    window.addEventListener("keyup", event => {
      // debugger;.
      self.keyStatus[event.key] = false;
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

  resetKeyStatus(){
    this.keyStatus = {};
  }

  pointStartPos(){
    return LEVELS[this.levelCount].pointStartPos;
  }

  walls(){
    return LEVELS[this.levelCount].walls;
  }

  step(){
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.analyzeKeyMap();
    this.moveMonsters();
    this.board.draw();
    if (this.point.hasEscaped() || this.point.eaten) {
      this.point.hasEscaped() ? this.levelPassed(this.levelCount) : this.playerEaten(this.levelCount);
      this.resetKeyStatus();
      this.levelCount += 1;
      this.point = new Point(this.context, this.canvas, this.pointStartPos());
      this.board = new Board(this.context, this.canvas, this.point, this.walls());
      this.board.monsters = this.createMonsters();
    }
    requestAnimationFrame(this.step);
  }

  assignDirection() {
      if (this.keyStatus["ArrowUp"] && this.keyStatus["ArrowLeft"]) {
          return "NW";
      } else if (this.keyStatus["ArrowLeft"] && this.keyStatus["ArrowDown"]){
          return "SW";
      } else if (this.keyStatus["ArrowUp"] && this.keyStatus["ArrowRight"]){
          return "NE";
      } else if (this.keyStatus["ArrowRight"] && this.keyStatus["ArrowDown"]){
          return "SE";
      } else if (this.keyStatus["ArrowLeft"]) {
          return "W";
      } else if (this.keyStatus["ArrowRight"]) {
          return "E";
      } else if (this.keyStatus["ArrowUp"]) {
          return "N";
      } else if (this.keyStatus["ArrowDown"]) {
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
