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

    document.addEventListener("keydown", event => {
      if (event.key === "w"){
        this.point.animate(this.point,"up");
      }else if (event.key === "a") {
        this.point.animate(this.point,"left");
      }else if (event.key === "s"){
        this.point.animate(this.point,"down");
      }else if (event.key === "d"){
        this.point.animate(this.point,"right");
      }else if (event.key === " "){
        let ray = new Ray(context, this.point.pos);
        ray.grow();
      }
    });

    document.addEventListener("keyup", event => {
      point.stopMoving();
    });
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
