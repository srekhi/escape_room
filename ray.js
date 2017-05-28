class Ray {
  constructor(context, startPos, xGrowthFactor, yGrowthFactor){
    this.c = context;
    this.lifespan = 100; //milliseconds
    this.head = startPos;
    this.tail = startPos;
    this.c.beginPath();
    this.c.moveTo(startPos[0], startPos[1]);
    this.c.strokeStyle = "blue";
    this.xGrowthFactor = xGrowthFactor;
    this.yGrowthFactor = yGrowthFactor;
  }

  grow(){
    while (this.lifespan > 0){
      this.head[0] += this.yGrowthFactor;
      this.head[1] += this.xGrowthFactor;
      this.c.lineTo(this.head[0], this.head[1]);
      this.c.strokeStyle = "blue";
      this.c.stroke();
      this.lifespan -= 1;
    }
  }
  handleCollision(wall){
    
  }
}

export default Ray;
