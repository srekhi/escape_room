import Wall from './wall';
import Level from './level';
import Point from './point';
import Ray from './ray';
// let walls = [
//   new Wall(0, 0, window.innerWidth /2, window.innerHeight / 2),
//   new Wall(0, window.innerHeight/2 + 50, window.innerWidth, window.innerHeight / 2),
//   new Wall(window.innerWidth/2 + 50, 0, window.innerWidth /2, window.innerHeight)
// ];
class Game {
  constructor(context, walls, point) {
    this.context = context;
    this.walls = walls;
    this.point = point;
    let level = new Level(context, walls);
    level.draw();
    point.draw();
    this.keyStatus = {}; //keep tally of which keys are pressed down.
    // this.directions = { "w": "up", "s":"down", "d":"right", "a": "left"};
    this.createEventListeners();
  }
  createEventListeners(){
    window.addEventListener("keydown", event => {
      this.keyStatus[event.key] = true;
      let direction = this.assignDirection();
      if (!this.collides(this.point.nextPos(direction))){
          this.point.move(direction);
        }
      });
    window.addEventListener("keydown", event => {
      if (event.key === " ") {
          event.preventDefault();
          this.point.makeSound();
        }
    });
    window.addEventListener("keyup", event => {
      this.keyStatus[event.key] = false;
      // this.point.stopMoving();
    });
  }

  assignDirection() {
      if (this.keyStatus["w'"] && this.keyStatus["a"]) {
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
    return this.walls.some( wall => {
      return !(
        (coords[0] < wall.topLeft[0])
          || (coords[0] > wall.bottomRight[0])
          || (coords[1] < wall.topLeft[1])
          || (coords[1] > wall.bottomRight[1])
      );
    }); //if any of these 4 conditions are met, no collision.
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