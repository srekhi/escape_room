import Game from './game';
class Ray {
  constructor(context, lifespan, startPos, xDir, yDir, board){
    this.c = context;
    this.lifespan = lifespan;
    this.head = startPos;
    this.tail = startPos;
    this.c.beginPath();
    this.body = [this.startPos]; //records each point along the ray's line.
    this.startPos = startPos;
    this.c.moveTo(startPos[0], startPos[1]);
    this.c.lineTo(startPos[0] + xDir, startPos[1] + yDir);
    this.lifespan -= 1;
    this.c.strokeStyle = "blue";
    this.maxLen = 50;
    this.c.stroke();
    this.xDir = xDir;
    this.yDir = yDir;
    this.board = board;
    this.draw();
    this.board.rays.push(this);
    this.length = 0;
  }

  grow(){
    if (this.lifespan > 0 && !this.collision()){
      this.head = [this.head[0] + this.xDir, this.head[1] + this.yDir];
      this.length += 1;
      this.body.push(this.head);
      if (this.length > this.maxLen){
        this.fadeOut();
      }
      this.lifespan -=1;
      return true;
    } else {
      return false;
    }
  }

  fadeOut(){
    this.body.shift();
    this.tail = this.body[0];
    }

  draw(){
    this.c.beginPath();
    this.c.moveTo(this.tail[0], this.tail[1]);
    if (this.grow()){
      this.c.lineTo(this.head[0], this.head[1]);
      let gradient = this.c.createLinearGradient(this.tail[0], this.tail[1], this.head[0], this.head[1]);
      gradient.addColorStop(0, '#808080');
      gradient.addColorStop(1, 'white');
      this.c.strokeStyle = gradient;
      this.c.stroke();
    }
  }

  nextPos(){

  }
  collision(){
    let newXDir = this.xDir;
    let newYDir = this.yDir;

    const newHeadX = this.head[0] + (this.xDir);
    const newXPoint = [newHeadX, this.head[1]];

    const newHeadY = this.head[1] + (this.yDir);
    const newYPoint = [this.head[0], newHeadY];
    // console.log(this.lifespan);
    let xCollision = this.board.collides(newXPoint);
    let yCollision = this.board.collides(newYPoint);
    if (xCollision || yCollision){
      if (xCollision && yCollision){
        newXDir = -1 * this.xDir;
        newYDir = -1 * this.yDir;
      }else if (xCollision){
        newXDir = -1 * this.xDir;
      }else if (yCollision){
        newYDir = -1 * this.yDir;
      }
      const reflection = new Ray(this.c, this.lifespan - 1,this.head, newXDir, newYDir, this.board);
      this.board.rays.push(reflection);
      this.xDir = 0;
      this.yDir = 0;

      return true;
    }else{
      return false;
    }
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