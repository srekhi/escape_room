/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import LEVELS from './levels_structure';


var _wall = __webpack_require__(5);

var _wall2 = _interopRequireDefault(_wall);

var _level = __webpack_require__(2);

var _level2 = _interopRequireDefault(_level);

var _point = __webpack_require__(3);

var _point2 = _interopRequireDefault(_point);

var _ray = __webpack_require__(4);

var _ray2 = _interopRequireDefault(_ray);

var _board = __webpack_require__(1);

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LEVELS = {
  1: {
    walls: [[0, 0, 0.55, 0.25], [0, 0.3, 0.7, 0.25], [0.25, 0, 0.4, 0.25], [0, 0, 0.02, 1], [0.8, 0, 0.01, 1]],
    pointStartPos: [.1, .27]
  },
  2: {
    walls: [[0, 0.25, 0.8, 0.2], [0.6, 0.6, 0.4, 0.2], [0, 0.45, 0.4, 0.55], [0.4, 0.9, 0.2, 0.1]],
    pointStartPos: [0.01, 0.01]
  }
};

var Game = function () {
  function Game(context, canvas, point) {
    _classCallCheck(this, Game);

    this.context = context;
    this.levelCount = 1;
    // debugger;
    this.canvas = canvas;
    this.point = new _point2.default(context, canvas, LEVELS[2].pointStartPos);
    this.board = new _board2.default(context, canvas, this.point, LEVELS[2].walls);

    this.point.draw();
    this.keyStatus = {}; //keep tally of which keys are pressed down.
    // this.directions = { "w": "up", "s":"down", "d":"right", "a": "left"};
    this.createEventListeners();
    this.step = this.step.bind(this);
    this.step();
  }

  _createClass(Game, [{
    key: 'createEventListeners',
    value: function createEventListeners() {
      var _this = this;

      var self = this;
      window.addEventListener("keydown", function (event) {
        _this.keyStatus[event.key] = true;
      });

      window.addEventListener("keydown", function (event) {
        if (event.key === " ") {
          event.preventDefault();
          _this.point.makeSound(_this.board); //needs to be separate JS effect from point.
        }
      });
      window.addEventListener("keyup", function (event) {
        _this.keyStatus[event.key] = false;
      });
    }
  }, {
    key: 'analyzeKeyMap',
    value: function analyzeKeyMap() {
      var direction = this.assignDirection();
      if (!this.collides(this.point.nextPos(direction))) {
        this.point.move(direction);
      }
    }
  }, {
    key: 'hasWon',
    value: function hasWon() {
      //check if player is out of bounds
    }
  }, {
    key: 'step',
    value: function step() {
      //clear out the board
      // this.keyStatus = {};
      this.context.fillStyle = "#222";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.analyzeKeyMap();
      this.board.draw(); //will redraw board based on position of everything.
      if (this.point.hasEscaped()) {
        alert("YOU WON");
        this.levelCount += 1;
        this.point = new _point2.default(this.context, this.canvas, LEVELS[this.levelCount].pointStartPos);
        this.board = new _board2.default(this.context, this.canvas, this.point, LEVELS[this.levelCount].walls);
        //instantiate next level board.
        return;
      }

      requestAnimationFrame(this.step);
    }
  }, {
    key: 'assignDirection',
    value: function assignDirection() {
      if (this.keyStatus["w"] && this.keyStatus["a"]) {
        return "NW";
      } else if (this.keyStatus["a"] && this.keyStatus["s"]) {
        return "SW";
      } else if (this.keyStatus["w"] && this.keyStatus["d"]) {
        return "NE";
      } else if (this.keyStatus["d"] && this.keyStatus["s"]) {
        return "SE";
      } else if (this.keyStatus["a"]) {
        return "W";
      } else if (this.keyStatus["d"]) {
        return "E";
      } else if (this.keyStatus["w"]) {
        return "N";
      } else if (this.keyStatus["s"]) {
        return "S";
      } else {
        return "";
      }
    }
  }, {
    key: 'collides',
    value: function collides(coords) {
      return this.board.collides(coords);
    }
  }]);

  return Game;
}();

exports.default = Game;

//   let p = new Point(ctx, [0, window.innerHeight / 2 + 25] );
//   let level1 = new Level(ctx, walls);
//   level1.draw();
//   p.draw();
//   document.addEventListener("keypress", event => {
//     if (event.key === "w"){
//       animate(p,"up");
//     }else if (event.key === "a") {
//       animate(p,"left");
//     }else if (event.key === "s"){
//       animate(p,"down");
//     }else if (event.key === "d"){
//       animate(p,"right");
//     }else if (event.key === " "){
//       let ray = new Ray(ctx, p.pos);
//       ray.grow();
//     }
//   });
// });
//
//
// function animate(point, direction){
//   console.log(direction);
//   point.move(direction);
//   requestAnimationFrame(() =>{
//     animate(point, direction);
//   });
// }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wall = __webpack_require__(5);

var _wall2 = _interopRequireDefault(_wall);

var _level = __webpack_require__(2);

var _level2 = _interopRequireDefault(_level);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board(ctx, canvas, point, wallDimensions) {
    _classCallCheck(this, Board);

    this.context = ctx;
    this.point = point;
    this.wallDimensions = wallDimensions;
    // this.walls = [
    //   new Wall(0, 0, window.innerWidth /4 - 100, window.innerHeight / 4 - 50),
    //   new Wall(0, window.innerHeight/4 + 50, window.innerWidth - 50, window.innerHeight / 4),
    //   new Wall(window.innerWidth/4 + 50, 0, window.innerWidth /2 - 50, window.innerHeight / 4),
    //   new Wall(0, 0, window.innerWidth / 35 , window.innerHeight)
    // ];

    this.wallDimensions = this.wallDimensions.map(function (row) {
      return row.map(function (dim, index) {
        if (index % 2 === 0) {
          return dim * canvas.width;
        } else {
          return dim * canvas.height;
        }
      });
    });
    this.walls = this.wallDimensions.map(function (wallArr) {
      return new (Function.prototype.bind.apply(_wall2.default, [null].concat(_toConsumableArray(wallArr))))();
    });
    var level = new _level2.default(this.context, this.walls);
    this.level = level;
    this.rays = []; //store all rays in the game.
  }

  _createClass(Board, [{
    key: 'walls',
    value: function walls() {
      return this.walls;
    }

    // inBounds(coords){
    //   // if point is outside of cavas, return false, else true
    //   return !(coords[0] > window.innerWidth
    //     || coords[0] < 0
    //     || coords[1] > window.innerHeight
    //     || coords[1] < 0);
    // }

  }, {
    key: 'advanceRays',
    value: function advanceRays() {
      //each step reduces the rays lifetimes by 1.
      this.rays = this.removeDeadRays();
      this.rays.forEach(function (ray) {
        return ray.draw();
      });
    }
  }, {
    key: 'removeDeadRays',
    value: function removeDeadRays() {
      return this.rays.filter(function (ray) {
        return ray.lifespan > 0;
      });
    }
  }, {
    key: 'collides',
    value: function collides(coords) {
      return this.walls.some(function (wall) {
        return !(coords[0] < wall.topLeft[0] || coords[0] > wall.bottomRight[0] || coords[1] < wall.topLeft[1] || coords[1] > wall.bottomRight[1]);
      });
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.point.draw();
      this.advanceRays();
      this.level.draw(); //draw the structure of the level
    }
  }]);

  return Board;
}();

exports.default = Board;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _point = __webpack_require__(3);

var _point2 = _interopRequireDefault(_point);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Level = function () {
  function Level(context, walls) {
    _classCallCheck(this, Level);

    this.walls = walls;
    this.context = context;
    // this.point = new Point(context
  }

  _createClass(Level, [{
    key: 'draw',
    value: function draw() {
      var _this = this;

      this.walls.forEach(function (wall) {
        wall.draw(_this.context);
      });
    }
  }]);

  return Level;
}();

exports.default = Level;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = __webpack_require__(0);

var _game2 = _interopRequireDefault(_game);

var _ray = __webpack_require__(4);

var _ray2 = _interopRequireDefault(_ray);

var _board = __webpack_require__(1);

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function () {
  function Point(context, canvas, startingPos) {
    _classCallCheck(this, Point);

    this.c = context;
    this.pos = [startingPos[0] * canvas.width, startingPos[1] * canvas.height];
    this.dx = 5;
    this.dy = -5;
    this.moving = false;
    this.canvas = canvas;
    // this.board = board;
    // this.draw();
    // this.animate = this.animate.bind(this);
    this.movementDeltas = {
      "NW": [-this.dx, this.dy],
      "SW": [-this.dx, -this.dy],
      "NE": [this.dx, this.dy],
      "SE": [this.dx, -this.dy],
      "W": [-this.dx, 0],
      "E": [this.dx, 0],
      "N": [0, this.dy],
      "S": [0, -this.dy]
    };
  }

  _createClass(Point, [{
    key: 'draw',
    value: function draw() {
      this.c.beginPath();
      this.c.arc(this.pos[0], this.pos[1], 5, 0, Math.PI * 2, false);
      this.c.fillStyle = "white";
      this.c.strokeStyle = "white";

      this.c.stroke();
    }
  }, {
    key: 'hasEscaped',
    value: function hasEscaped() {
      // if point is outside of cavas, return false, else true
      return this.pos[0] > this.canvas.width || this.pos[0] < 0 || this.pos[1] > this.canvas.height || this.pos[1] < 0;
    }
  }, {
    key: 'move',
    value: function move(direction) {
      var delta = void 0;
      this.moving = true;
      delta = this.movementDeltas[direction];
      this.pos = this.nextPos(direction);
      this.draw();
    }
  }, {
    key: 'makeSound',
    value: function makeSound(board) {
      var _this = this;

      console.log("WAVY");
      var counter = 10;
      _ray2.default.DIRECTIONS.forEach(function (dir) {
        new _ray2.default(_this.c, 100, _this.pos, dir[0] * 3, dir[1] * 3, board);
      });

      // let ray = new Ray(this.c, this.pos, 1, 1, board);
      //
      // ray.grow();
    }
  }, {
    key: 'nextPos',
    value: function nextPos(direction) {
      var delta = void 0;
      delta = this.movementDeltas[direction] || [0, 0]; //in case key pressed is irrelevant
      return this.pos.map(function (posDir, index) {
        return posDir + delta[index];
      });
    }
  }, {
    key: 'stopMoving',
    value: function stopMoving() {
      this.moving = false;
      window.cancelAnimationFrame(window.animationFrameId);
    }

    // animate(direction){
    //   // this.c.clearRect(0, 0, innerHeight, innerWidth);
    //   this.move(direction);
    //   window.animationFrameId = window.requestAnimationFrame(() =>{
    //     if (this.moving){
    //       this.animate(direction);
    //       if (this.collides()) this.stopMoving();
    //     }
    //   });
    // }

  }]);

  return Point;
}();

exports.default = Point;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = __webpack_require__(0);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ray = function () {
  function Ray(context, lifespan, startPos, xDir, yDir, board) {
    _classCallCheck(this, Ray);

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

  _createClass(Ray, [{
    key: 'grow',
    value: function grow() {
      if (this.lifespan > 0 && !this.collision()) {
        this.head = [this.head[0] + this.xDir, this.head[1] + this.yDir];
        this.length += 1;
        this.body.push(this.head);
        if (this.length > this.maxLen) {
          this.fadeOut();
        }
        this.lifespan -= 1;
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'fadeOut',
    value: function fadeOut() {
      this.body.shift();
      this.tail = this.body[0];
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.c.beginPath();
      this.c.moveTo(this.tail[0], this.tail[1]);
      if (this.grow()) {
        this.c.lineTo(this.head[0], this.head[1]);
        var gradient = this.c.createLinearGradient(this.tail[0], this.tail[1], this.head[0], this.head[1]);
        gradient.addColorStop(0, '#808080');
        gradient.addColorStop(1, 'white');
        this.c.strokeStyle = gradient;
        this.c.stroke();
      }
    }
  }, {
    key: 'nextPos',
    value: function nextPos() {}
  }, {
    key: 'collision',
    value: function collision() {
      var newXDir = this.xDir;
      var newYDir = this.yDir;

      var newHeadX = this.head[0] + this.xDir;
      var newXPoint = [newHeadX, this.head[1]];

      var newHeadY = this.head[1] + this.yDir;
      var newYPoint = [this.head[0], newHeadY];
      // console.log(this.lifespan);
      var xCollision = this.board.collides(newXPoint);
      var yCollision = this.board.collides(newYPoint);
      if (xCollision || yCollision) {
        if (xCollision && yCollision) {
          newXDir = -1 * this.xDir;
          newYDir = -1 * this.yDir;
        } else if (xCollision) {
          newXDir = -1 * this.xDir;
        } else if (yCollision) {
          newYDir = -1 * this.yDir;
        }
        var reflection = new Ray(this.c, this.lifespan - 1, this.head, newXDir, newYDir, this.board);
        this.board.rays.push(reflection);
        this.xDir = 0;
        this.yDir = 0;

        return true;
      } else {
        return false;
      }
    }
  }]);

  return Ray;
}();

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

var root3over2 = Math.sqrt(3) / 2;
var root2over2 = Math.sqrt(2) / 2;

Ray.DIRECTIONS = [[0, 1], [0.5, root3over2], [root2over2, root2over2], [root3over2, 0.5], [1, 0], [root3over2, -0.5], [root2over2, -root2over2], [0.5, -root3over2], [0, -1], [-0.5, -root3over2], [-root2over2, -root2over2], [-root3over2, -0.5], [-1, 0], [-root3over2, 0.5], [-root2over2, root2over2], [-0.5, root3over2]];

exports.default = Ray;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Wall = function () {
  function Wall(x, y, width, height) {
    _classCallCheck(this, Wall);

    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.topLeft = [x, y];
    this.topRight = [x + width, y];
    this.bottomLeft = [x, y + height];
    this.bottomRight = [x + width, y + height];
  }

  _createClass(Wall, [{
    key: "draw",
    value: function draw(context) {
      context.fillStyle = "black";
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }]);

  return Wall;
}();

exports.default = Wall;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LEVELS = {
  1: {
    walls: [[0, 0, 0.55, 0.25], [0, 0.3, 0.7, 0.25], [0.25, 0, 0.4, 0.25], [0, 0, 0.02, 1], [0.8, 0, 0.01, 1]],
    pointStartPos: [.1, .27]
  },
  2: {
    walls: [],
    pointStartPos: []
  }
};

exports.default = LEVELS;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _wall = __webpack_require__(5);

var _wall2 = _interopRequireDefault(_wall);

var _levels_structure = __webpack_require__(6);

var _levels_structure2 = _interopRequireDefault(_levels_structure);

var _level = __webpack_require__(2);

var _level2 = _interopRequireDefault(_level);

var _point = __webpack_require__(3);

var _point2 = _interopRequireDefault(_point);

var _ray = __webpack_require__(4);

var _ray2 = _interopRequireDefault(_ray);

var _game = __webpack_require__(0);

var _game2 = _interopRequireDefault(_game);

var _board = __webpack_require__(1);

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById('canvas');
  var body = document.getElementsByTagName('body')[0];
  canvas.width = body.offsetWidth;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext("2d");
  // (0, 0, window.innerWidth / 10, window.innerHeight)

  // this.wallDimensions = [
  //           [0, 0, 0.55, 0.25],
  //           [0, 0.3, 0.7, 0.25],
  //           [0.25, 0, 0.4, 0.25],
  //           [0, 0, 0.02, 1],
  //       ];
  var levelCount = 1;
  var game = new _game2.default(ctx, canvas);
  document.addEventListener("keypress", hideSplashText);
});

var hideSplashText = function hideSplashText() {
  var introText = document.getElementById("game-intro");
  var canvas = document.getElementById("canvas");
  introText.classList.add("hidden");
  canvas.classList.remove("hidden");
  document.removeEventListener("keypress", hideSplashText);
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map