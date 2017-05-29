# Escape Room 

## Background
Escape room is a browser based echolocation game. The user is left in a dark room and must escape by creating sound and using the sound waves as a guide around room obstacles. 

### MVP Features
Allow users to interact with the game by
  -	moving their player around the room with keys: w, a, s, d.
  -	creating sound via spacebar
  - Display win message if user escapes maze. 
  
### Wireframes:
![Wireframe](/home-wireframe.png)

### Architecture and technologies
Escape room will be implemented with only vanilla javascript and HTML5 Canvas. Webpack will bundle and serve up the various scripts involved.

In addition to the webpack entry file, some of the other scripts required by this project are as follows:
  + board.js
    * Handles all board logistics, including redrawing all components on the screen.
  + point.js 
    * Represents player's movement
  + ray.js
    * Handles the sound rays movement, including collision patterns + linear gradient.

### Implementation Timeline
  #### Day 1 
    - Create webpack.config.js as well as package.json. Write a basic entry file and the bare bones of all three scripts outlined above and any others found to be necessary. Learn the basics of HTML5 Canvas. Goals for the day:
      * Get a green bundle with webpack
      * Learn enough HTML5 Canvas to render the maze on the canvas.
  #### Day 2 
    - Build out point and sound ray functionality and display. Implement collision logic.
 #### Day 3
    - Add styling and splash page. Add logic and corresponding alerts for when the user has won the game.
 #### Day 4
    - Add multiple levels to the game and the logic rerendering canvas after user passes each level.
    
### Bonus Features
  - Add monsters inside the maze to chase the user if awakened. If a user is caught by the monster, end the game.
  - Allow user to select color scheme for maze.

