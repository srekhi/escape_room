import Game from './game';
class Ray {
  constructor(context, startPos, xDir, yDir, board){
    this.c = context;
    this.lifespan = 10;
    this.head = startPos;
    this.tail = startPos;
    this.c.beginPath();
    this.c.moveTo(startPos[0], startPos[1]);
    this.c.lineTo(startPos[0] + xDir, startPos[1] + yDir);
    this.c.strokeStyle = "blue";
    this.c.stroke();
    this.xDir = xDir;
    this.yDir = yDir;
    this.board = board;
  }

  grow(){
    while (this.lifespan > 0){
      // this.c.beginPath();
      this.c.moveTo(this.startPos);
      this.head[0] += this.xDir;
      this.head[1] += this.yDir;
      this.c.lineTo(this.head[0], this.head[1]);
      this.c.strokeStyle = "blue";
      this.c.stroke();
      this.lifespan -= 1;
    }
  }

  nextPos(){

  }
  handleCollision(){
    //use the next position.
    //check if reflects on x or y.
    //adjust ray position accordingly.
  }
}


// The coordinates of a point with angle a with respect to x-axis on a circle of radius 1 are:
// x = cos(a*Pi/180), y = sin(a*Pi/180)

// const sixtyDegrees = 60 * Math.PI/180;
// const sixtyDegreesX = Math.cos(sixtyDegrees);
// const sixtyDegreesY = Math.sin(sixtyDegrees);
//
// const fortyFiveDegrees = (45 * Math.PI/180);
// const fortyFiveDegreesX = Math.cos(fortyFiveDegrees);
// const fortyFiveDegreesY = Math.sin(fortyFiveDegrees);
//
// const thirtyDegrees = (30 * Math.PI/180);
// const thirtyDegreesX = Math.cos(thirtyDegrees);
// const thirtyDegreesY = Math.sin(thirtyDegrees);
//

const root3over2 = Math.sqrt(3)/2;
const root2over2 = Math.sqrt(2)/2;



Ray.DIRECTIONS = [
  [0, 1],
  [0.5, root3over2],
  [root2over2, root2over2],
  [root3over2, 0.5],
  [1, 0],
  [root3over2, -0.5],
  [root2over2, -root2over2],
  [0.5, -root3over2],
  [0, -1],
  [-0.5, -root3over2],
  [-root2over2, -root2over2],
  [-root3over2, -0.5],
  [-1, 0],
  [-root3over2, 0.5],
  [-root2over2, root2over2],
  [-0.5, root3over2],
];

export default Ray;
