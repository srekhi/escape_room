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
    this.directions = { "w": "up", "s":"down", "d":"right", "a": "left"};
    document.addEventListener("keydown", event => {
      let direction;
      if (this.directions[event.key]){
        direction = this.directions[event.key];
      }else if (event.key === " "){
        for (var i = 0; i < 10; i++) {
          let ray = new Ray(context, this.point.pos);
          ray.grow();
          return;
        }
      } else {
        direction = "";
      }
      if (!this.collides(this.point.nextPos(direction))){
        this.point.move(direction);
      }
    });

    document.addEventListener("keyup", event => {
      point.stopMoving();
    });
  }

  collides(coords){
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
