import Wall from './wall';
class Board {
  constructor(){
    this.walls = [
      new Wall(0, 0, window.innerWidth /2, window.innerHeight / 2),
      new Wall(0, window.innerHeight/2 + 50, window.innerWidth, window.innerHeight / 2),
      new Wall(window.innerWidth/2 + 50, 0, window.innerWidth /2, window.innerHeight)
    ];
  }

  walls(){
    return this.walls;
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
}

export default Board;
