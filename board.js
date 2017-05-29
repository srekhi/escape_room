import Wall from './wall';
import Level from './level';
class Board {
  constructor(ctx, point){
    this.context = ctx;
    this.point = point;
    this.walls = [
      new Wall(0, 0, window.innerWidth /2 -50, window.innerHeight / 2 - 50),
      new Wall(0, window.innerHeight/2 + 50, window.innerWidth, window.innerHeight / 2),
      new Wall(window.innerWidth/2 + 50, 0, window.innerWidth /2, window.innerHeight),
      new Wall(0, 0, window.innerWidth / 35, window.innerHeight)
    ];
    let level = new Level(this.context, this.walls);
    this.level = level;
    this.rays = []; //store all rays in the game.

  }

  walls(){
    return this.walls;
  }

  inBounds(coords){
    // if point is outside of cavas, return false, else true
    return !(coords[0] > window.innerWidth
      || coords[0] < 0
      || coords[1] > window.innerHeihgt
      || coords[1] < 0);
  }

  advanceRays(){ //each step reduces the rays lifetimes by 1.
    this.rays = this.removeDeadRays();
    this.rays.forEach(ray =>
      ray.draw()
    );
  }

  removeDeadRays(){
    return this.rays.filter(ray =>
      ray.lifespan > 0
    );
  }

  collides(coords) {
    return this.walls.some( wall => {
      return !(
        (coords[0] < wall.topLeft[0])
          || (coords[0] > wall.bottomRight[0]
          || (coords[1] < wall.topLeft[1])
          || (coords[1] > wall.bottomRight[1])
          )
      );
    });
  }

  draw(){
    this.point.draw();
    this.advanceRays();
    this.level.draw(); //draw the structure of the level
  }
}

export default Board;
