import Game from './game';
class Ray {
  constructor(context, startPos, xGrowthFactor, yGrowthFactor){
    this.c = context;
    this.lifespan = 100; //milliseconds
    this.head = startPos;
    this.tail = startPos;
    this.c.beginPath();
    this.c.moveTo(startPos[0], startPos[1]);
    this.c.lineTo(startPos[0] + 10 , startPos[1] + 10 );
    this.c.strokeStyle = "blue";
    this.c.stroke();
    this.xGrowthFactor = xGrowthFactor;
    this.yGrowthFactor = yGrowthFactor;
  }

  grow(){
    while (this.lifespan > 0){
      this.head[0] += this.xGrowthFactor;
      this.head[1] += this.yGrowthFactor;
      this.c.lineTo(this.head[0], this.head[1]);
      this.c.strokeStyle = "blue";
      this.c.stroke();
      this.lifespan -= 1;
    }
  }
  handleCollision(){
    
  }
}

export default Ray;
