
# Escape Room
[Live website](https://srekhi.github.io/escape_room/)

Browser-based echolocation game built with HTML/CSS & Javascript.

## Story
User is trapped in a dark room and must use echolocation to escape. Hitting the space bar allows the user to generate sound waves which bounce off of nearby obstacles and guide the user to the exit.

There's just one catch. Monsters are sleeping all across the map. If the user makes too much sound, the monster will wake up..hungry.

## Implementation
### Overview 

  #### Game 
  The Game object encapsulates all game logic, including keeping count of user's level and redrawing the board depending on the user's status (still in game play, eaten, or escaped):
  ```javascript
    //game.js
    
    step(){
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.analyzeKeyMap();
    this.moveMonsters();
    this.board.draw();
    if (this.point.hasEscaped() || this.point.eaten) {
      this.point.hasEscaped() ? this.levelPassed(this.levelCount) : this.playerEaten(this.levelCount);
      this.resetKeyStatus();
      this.levelCount += 1;
      this.point = new Point(this.context, this.canvas, this.pointStartPos());
      this.board = new Board(this.context, this.canvas, this.point, this.walls());
      this.board.monsters = this.createMonsters();
    }
    requestAnimationFrame(this.step);
  }
  ```
  On average, requestAnimationFrame will be run 60 times per second. The game class runs the object initialization code and delegates rendering responsibilities to the Board class.

 #### Responsive Design
 In order to reach a broader audience, Escape Room was designed to resize for the user's browser. The startGame() function is run when the user loads escape room in the browser--> the HTML canvas width and height are then set accordingly to the body and height dimensions respectively. 
 ```javascript 
   //main.js
  
   const startGame = () =>{
    const body = document.getElementsByTagName('body')[0];
    const canvas = document.getElementById('canvas');
    canvas.width = body.offsetWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    let levelCount = 1;
    const game = new Game(ctx, canvas, levelPassed, playerEaten);
    document.addEventListener("keydown", hideSplashText);
  };
 ```
 ```css
  /* main.css */
   body {
      height: 100vh;
      max-height: 800px;
      max-width: 800px;
      margin: 0 auto;
    }
 ```
  Additionally, all levels are constructed in scalar values and rendered by multiplying with the canvas width and height attributes.
  **make this LEVELS export its own file and add comment in-line to code snippet**
  ```javascript
    const LEVELS = {
    1: {
      walls:
      [
          [0, 0, 0.55, 0.25],
          [0, 0.3, 0.7, 0.25],
          [0.25, 0, 0.4, 0.25],
          [0, 0, 0.02, 1],
          [0.8, 0, 0.01, 1]
      ],
      pointStartPos: [.1, .27],
      monsterPositions: [
        [0.7, 0.20],
      ]
    },
    2: {
      walls: [
        [0.0, 0.01, 1, 0.05],
        [0.0, 0.01, 0.01, 1],
        [0, 0.25, 0.8, 0.2],
        [0.6, 0.6, 0.4, 0.2],
        [0, 0.45, 0.4, 0.55],
        [0.4, 0.9, 0.2, 0.1],
        [0.9, 0, 0.2, 1]

      ],
      pointStartPos: [0.1, 0.1],
      monsterPositions: [
        [0.5, 0.5],
      ]
    }, ...
  ```
  
  ```javascript
   //board.js
     this.wallDimensions = scalarWallDimensions
          .map(row => {
            return row.map((dim, index) => {
              if (index % 2 === 0) {
                return dim * canvas.width;
              } else {
                return dim * canvas.height;
              }
            });
          });
   ```
   #### Sound 
   When a user hits the space bar, their point emits sound rays **add video here** Each sound ray logic is encompassed by the Ray class. The circular emission pattern was based off of unit circle calculations:
    ```
    // ray.js 
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
   ```
    Escape room rays, like real-life sound rays, have two things in common: both reflect off of obstacles, and both fade away.
    #### Reflections
    If a sound ray's next position is going to result in a collision with one of the many walls on the level, they're reversed depending on three categories: whether the X, Y, or Z coordinates resulted in a collision:
    ```javascript 
    let newXDir = this.xDir;
    let newYDir = this.yDir;

    const newHeadX = this.head[0] + (this.xDir);
    const newXPoint = [newHeadX, this.head[1]];

    const newHeadY = this.head[1] + (this.yDir);
    const newYPoint = [this.head[0], newHeadY];
    
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
      const reflection = new Ray(this.c, this.lifespan - 1, this.head, newXDir, newYDir, this.board, this.fromMonster);
      return true;
    }else{
      return false;
    }
    ```
    Each ray has a max length & a body property. The body array contains each position along the ray's axis. To grow the ray, new positions are pushed onto the body array. Similarly, when a ray must be faded out, the first positions in the array are shifted off:
    ```
    ///ray.js
      fadeOut(){
        this.body.shift();
        this.tail = this.body[0];
      }
    ```

  To provide accurate visuals, HTML Canvas's createLinearGradient()  method was used. 
    ```javascript
        //ray.js 

        draw(){
        let gradient;
        if (this.grow()){
          this.c.beginPath();
          this.c.moveTo(this.tail[0], this.tail[1]);
          gradient = this.c.createLinearGradient(this.tail[0], this.tail[1], this.head[0], this.head[1]);
          if (this.fromMonster){
            gradient.addColorStop(0, '#3d0101');
            gradient.addColorStop(1, 'red');
          }else{
            gradient.addColorStop(0, '#808080');
            gradient.addColorStop(1, 'white');
          }
          this.c.strokeStyle = gradient;
          this.c.lineTo(this.head[0], this.head[1]);
          this.c.closePath();
          this.c.stroke();
        }
      }
      ```
