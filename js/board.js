import Wall from './wall';
import Level from './level';

class Board {
  constructor(ctx, canvas, point, wallDimensions){
    this.context = ctx;
    this.point = point;
    this.wallDimensions = wallDimensions;

    this.wallDimensions = this.wallDimensions
            .map(row => {
              return row.map((dim, index) => {
                if (index % 2 === 0) {
                  return dim * canvas.width;
                } else {
                  return dim * canvas.height;
                }
              });
            });
    this.walls = this.wallDimensions.map(wallArr => new Wall(...wallArr));
    let level = new Level(this.context, this.walls);
    this.level = level;
    this.rays = []; //store all rays in the game.
    // this.draw();
  }

  walls(){
    return this.walls;
  }

  advanceRays(){
    this.rays = this.removeDeadRays();
    this.rays.forEach(ray => ray.draw());
  }

  removeDeadRays(){
    return this.rays.filter(ray => ray.lifespan > 0);
  }

  collides(coords) {
    return this.walls.some( wall => {
      return !(
        (coords[0] < wall.topLeft[0])
          || (coords[0] > wall.bottomRight[0])
          || (coords[1] < wall.topLeft[1])
          || (coords[1] > wall.bottomRight[1])
          );
      });
  }

  drawMonsters(){
    this.monsters.forEach(monster => monster.draw());
  }

  draw(){
    this.point.draw();
    this.drawMonsters();
    this.advanceRays();
    this.level.draw();
  }
}

export default Board;
