import Wall from './wall';
import LEVELS from './levels_structure';
import Level from './level';
import Point from './point';
import Ray from './ray';
import Board from './board';
import Monster from './monster';

class Game {
  constructor(context, canvas, levelPassed, playerEaten, gameCompleted) {
    this.context = context;
    this.levelCount = 1;
    this.levelPassed = levelPassed;
    this.gameCompleted = gameCompleted;
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
    let monsterPositions = LEVELS[this.levelCount].monsterPositions;
    this.monsters = monsterPositions.map(monsterPos => {
      return new Monster(this.context, this.canvas, monsterPos, this.board);
    });
    return this.monsters;
  }
  createEventListeners(){
    const self = this;
    window.addEventListener("keydown", event => {
        let key = event.key || event.keyIdentifier;
        if (key.startsWith("Arrow") || key.startsWith("Right")
        || key.startsWith("Down") || key.startsWith("Left") ||
        key.startsWith("Up")) event.preventDefault();
        if (key === "Meta") return;
        this.keyStatus[key] = true;
    });

    window.addEventListener("keydown", event => {
      let key = event.key || event.keyIdentifier;
      if (key === " " || key === "U+0020") {
          event.preventDefault();
          this.point.makeSound(this.board);
        }
    });
    window.addEventListener("keyup", event => {
      let key = event.key || event.keyIdentifier;
      self.keyStatus[key] = false;
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

  redrawGame(){
    this.point = new Point(this.context, this.canvas, this.pointStartPos());
    this.board = new Board(this.context, this.canvas, this.point, this.walls());
    this.board.monsters = this.createMonsters();
  }

  step(){
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.analyzeKeyMap();
    this.moveMonsters();
    this.board.draw();

    if (this.point.hasEscaped() || this.point.eaten) {
      if (this.point.hasEscaped() && this.levelCount === 4) {
        this.levelCount = 1;
        this.gameCompleted();
        return;
      }
      if (this.point.hasEscaped()) {
        this.levelPassed(this.levelCount);
        this.levelCount += 1;
      } else{
          this.playerEaten(this.levelCount);
      }
      this.resetKeyStatus();
      this.redrawGame();
    }
    requestAnimationFrame(this.step);
  }

  assignDirection() {
      if (this.keyStatus["ArrowUp"] && this.keyStatus["ArrowLeft"] || this.keyStatus["Up"] && this.keyStatus["Left"]) {
          return "NW";
      } else if (this.keyStatus["ArrowLeft"] && this.keyStatus["ArrowDown"] || this.keyStatus["Down"] && this.keyStatus["Left"]){
          return "SW";
      } else if (this.keyStatus["ArrowUp"] && this.keyStatus["ArrowRight"] || this.keyStatus["Up"] && this.keyStatus["Right"]){
          return "NE";
      } else if (this.keyStatus["ArrowRight"] && this.keyStatus["ArrowDown"] || this.keyStatus["Right"] && this.keyStatus["Down"]){
          return "SE";
      } else if (this.keyStatus["ArrowLeft"] || this.keyStatus["Left"]) {
          return "W";
      } else if (this.keyStatus["ArrowRight"] || this.keyStatus["Right"]) {
          return "E";
      } else if (this.keyStatus["ArrowUp"] || this.keyStatus["Up"]) {
          return "N";
      } else if (this.keyStatus["ArrowDown"] || this.keyStatus["Down"]) {
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
