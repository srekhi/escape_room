import Wall from './wall';
import Level from './level';
class Board {
  constructor(ctx, canvas, point){
    this.context = ctx;
    this.point = point;
    this.wallDimensions = [
              [0, 0, 0.55, 0.25],
              [0, 0.3, 0.7, 0.25],
              [0.25, 0, 0.4, 0.25],
              [0, 0, 0.02, 1],
              [0.8, 0, 0.01, 1]
          ];
    // this.walls = [
    //   new Wall(0, 0, window.innerWidth /4 - 100, window.innerHeight / 4 - 50),
    //   new Wall(0, window.innerHeight/4 + 50, window.innerWidth - 50, window.innerHeight / 4),
    //   new Wall(window.innerWidth/4 + 50, 0, window.innerWidth /2 - 50, window.innerHeight / 4),
    //   new Wall(0, 0, window.innerWidth / 35 , window.innerHeight)
    // ];

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

  }

  walls(){
    return this.walls;
  }

  // inBounds(coords){
  //   // if point is outside of cavas, return false, else true
  //   return !(coords[0] > window.innerWidth
  //     || coords[0] < 0
  //     || coords[1] > window.innerHeight
  //     || coords[1] < 0);
  // }

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
