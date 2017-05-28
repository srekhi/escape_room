import Point from './point';

class Level {
  constructor(context, walls){
    this.walls = walls;
    this.context = context;
    // this.point = new Point(context
  }

  draw(){
    this.walls.forEach((wall) => {
      wall.draw(this.context);
    });
  }
}

export default Level;
