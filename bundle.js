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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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

var _wall = __webpack_require__(5);

var _wall2 = _interopRequireDefault(_wall);

var _level = __webpack_require__(3);

var _level2 = _interopRequireDefault(_level);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board(ctx, canvas, point, scalarWallDimensions) {
    _classCallCheck(this, Board);

    this.context = ctx;
    this.point = point;
    this.canvas = canvas;
    this.wallDimensions = scalarWallDimensions.map(function (row) {
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
  }, {
    key: 'advanceRays',
    value: function advanceRays() {
      this.rays = this.removeDeadRays();
      if (this.rays.length > 900) {
        this.rays = this.rays.slice(300);
      }
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
    key: 'drawMonsters',
    value: function drawMonsters() {
      this.monsters.forEach(function (monster) {
        return monster.draw();
      });
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.level.draw();
      this.point.draw();
      this.drawMonsters();
      this.advanceRays();
    }
  }]);

  return Board;
}();

exports.default = Board;

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

var _levels_structure = __webpack_require__(6);

var _levels_structure2 = _interopRequireDefault(_levels_structure);

var _level = __webpack_require__(3);

var _level2 = _interopRequireDefault(_level);

var _point = __webpack_require__(4);

var _point2 = _interopRequireDefault(_point);

var _ray = __webpack_require__(2);

var _ray2 = _interopRequireDefault(_ray);

var _board = __webpack_require__(0);

var _board2 = _interopRequireDefault(_board);

var _monster = __webpack_require__(7);

var _monster2 = _interopRequireDefault(_monster);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(context, canvas, levelPassed, playerEaten, gameCompleted) {
    _classCallCheck(this, Game);

    this.context = context;
    this.levelCount = 1;
    this.levelPassed = levelPassed;
    this.gameCompleted = gameCompleted;
    this.canvas = canvas;
    this.point = new _point2.default(context, canvas, _levels_structure2.default[this.levelCount].pointStartPos);
    this.board = new _board2.default(context, canvas, this.point, _levels_structure2.default[this.levelCount].walls);
    this.monsters = this.createMonsters();
    this.board.monsters = this.monsters;
    this.playerEaten = playerEaten;
    this.keyStatus = {};
    this.createEventListeners();
    this.step = this.step.bind(this);
    this.step();
  }

  _createClass(Game, [{
    key: 'createMonsters',
    value: function createMonsters() {
      var _this = this;

      var monsterPositions = _levels_structure2.default[this.levelCount].monsterPositions;
      this.monsters = monsterPositions.map(function (monsterPos) {
        return new _monster2.default(_this.context, _this.canvas, monsterPos, _this.board);
      });
      return this.monsters;
    }
  }, {
    key: 'createEventListeners',
    value: function createEventListeners() {
      var _this2 = this;

      var self = this;
      window.addEventListener("keydown", function (event) {
        if (event.key.startsWith("Arrow")) event.preventDefault();
        if (event.key === "Meta") return;
        _this2.keyStatus[event.key] = true;
      });

      window.addEventListener("keydown", function (event) {
        if (event.key === " ") {
          event.preventDefault();
          _this2.point.makeSound(_this2.board);
        }
      });
      window.addEventListener("keyup", function (event) {
        self.keyStatus[event.key] = false;
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
    key: 'moveMonsters',
    value: function moveMonsters() {
      this.monsters.forEach(function (monster) {
        return monster.move();
      });
    }
  }, {
    key: 'resetKeyStatus',
    value: function resetKeyStatus() {
      this.keyStatus = {};
    }
  }, {
    key: 'pointStartPos',
    value: function pointStartPos() {
      return _levels_structure2.default[this.levelCount].pointStartPos;
    }
  }, {
    key: 'walls',
    value: function walls() {
      return _levels_structure2.default[this.levelCount].walls;
    }
  }, {
    key: 'redrawGame',
    value: function redrawGame() {
      this.point = new _point2.default(this.context, this.canvas, this.pointStartPos());
      this.board = new _board2.default(this.context, this.canvas, this.point, this.walls());
      this.board.monsters = this.createMonsters();
    }
  }, {
    key: 'step',
    value: function step() {
      this.context.fillStyle = "black";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.analyzeKeyMap();
      this.moveMonsters();
      this.board.draw();

      if (this.point.hasEscaped() || this.point.eaten) {
        if (this.point.hasEscaped() && this.levelCount === 4) {
          this.levelCount = 1;
          this.gameCompleted();
          return;
        }
        if (this.point.hasEscaped()) {
          this.levelPassed(this.levelCount);
          this.levelCount += 1;
        } else {
          this.playerEaten(this.levelCount);
        }
        this.resetKeyStatus();
        this.redrawGame();
      }
      requestAnimationFrame(this.step);
    }
  }, {
    key: 'assignDirection',
    value: function assignDirection() {
      if (this.keyStatus["ArrowUp"] && this.keyStatus["ArrowLeft"]) {
        return "NW";
      } else if (this.keyStatus["ArrowLeft"] && this.keyStatus["ArrowDown"]) {
        return "SW";
      } else if (this.keyStatus["ArrowUp"] && this.keyStatus["ArrowRight"]) {
        return "NE";
      } else if (this.keyStatus["ArrowRight"] && this.keyStatus["ArrowDown"]) {
        return "SE";
      } else if (this.keyStatus["ArrowLeft"]) {
        return "W";
      } else if (this.keyStatus["ArrowRight"]) {
        return "E";
      } else if (this.keyStatus["ArrowUp"]) {
        return "N";
      } else if (this.keyStatus["ArrowDown"]) {
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ray = function () {
  function Ray(context, lifespan, startPos, xDir, yDir, board, fromMonster) {
    _classCallCheck(this, Ray);

    this.c = context;
    this.fromMonster = fromMonster;
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
    this.c.closePath();
    this.c.stroke();
    this.xDir = xDir;
    this.yDir = yDir;
    this.board = board;
    this.draw();
    this.board.rays.push(this);
    this.length = 0;
    // debugger;
  }

  _createClass(Ray, [{
    key: 'grow',
    value: function grow() {
      if (this.lifespan > 0 && !this.collision()) {
        this.head = [this.head[0] + this.xDir, this.head[1] + this.yDir];
        this.length += 1;
        this.body.push(this.head);
        if (this.length > this.maxLen) this.fadeOut();
        this.lifespan -= 1;
        if (this.fromMonster) {
          //check if eaten player
          if (this.compareCoordToHead(this.board.point.pos)) this.board.point.eaten = true;
        }
        this.wakeMonsters();
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'compareCoordToHead',
    value: function compareCoordToHead(coord) {
      return Math.abs(Math.floor(this.head[0]) - Math.floor(coord[0])) < 3 && Math.abs(Math.floor(this.head[1]) - Math.floor(coord[1])) < 3;
    }
  }, {
    key: 'wakeMonsters',
    value: function wakeMonsters() {
      var _this = this;

      var dormantMonsters = this.board.monsters.filter(function (monster) {
        return !monster.awake;
      });
      dormantMonsters.forEach(function (monster) {
        if (_this.compareCoordToHead(monster.pos)) {
          monster.awake = true;
        }
      });
    }
  }, {
    key: 'containsAll',
    value: function containsAll(arr1, arr2) {
      return arr2.every(function (arr2Item) {
        return arr1.includes(arr2Item);
      });
    }
  }, {
    key: 'sameMembers',
    value: function sameMembers(arr1, arr2) {
      return this.containsAll(arr1, arr2) && this.containsAll(arr2, arr1);
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
      var gradient = void 0;
      if (this.grow()) {
        this.c.beginPath();
        this.c.moveTo(this.tail[0], this.tail[1]);
        gradient = this.c.createLinearGradient(this.tail[0], this.tail[1], this.head[0], this.head[1]);
        if (this.fromMonster) {
          gradient.addColorStop(0, '#3d0101');
          gradient.addColorStop(1, 'red');
        } else {
          gradient.addColorStop(0, '#808080');
          gradient.addColorStop(1, 'white');
        }
        this.c.strokeStyle = gradient;
        this.c.lineTo(this.head[0], this.head[1]);
        this.c.closePath();
        this.c.stroke();
      }
    }
  }, {
    key: 'collision',
    value: function collision() {
      var newXDir = this.xDir;
      var newYDir = this.yDir;

      var newHeadX = this.head[0] + this.xDir;
      var newXPoint = [newHeadX, this.head[1]];

      var newHeadY = this.head[1] + this.yDir;
      var newYPoint = [this.head[0], newHeadY];

      var xCollision = this.board.collides(newXPoint);
      var yCollision = this.board.collides(newYPoint);
      var zCollision = this.board.collides([newHeadX, newHeadY]);
      if (xCollision || yCollision || zCollision) {
        if (xCollision) {
          newXDir = -1 * this.xDir;
        } else if (yCollision) {
          newYDir = -1 * this.yDir;
        } else {
          newXDir = -1 * this.xDir;
          newYDir = -1 * this.yDir;
        }
        var reflection = new Ray(this.c, this.lifespan - 1, this.head, newXDir, newYDir, this.board, this.fromMonster);

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

//unit circle calculations


var root3over2 = Math.sqrt(3) / 2;
var root2over2 = Math.sqrt(2) / 2;

Ray.DIRECTIONS = [[0, 1], [0.5, root3over2], [root2over2, root2over2], [root3over2, 0.5], [1, 0], [root3over2, -0.5], [root2over2, -root2over2], [0.5, -root3over2], [0, -1], [-0.5, -root3over2], [-root2over2, -root2over2], [-root3over2, -0.5], [-1, 0], [-root3over2, 0.5], [-root2over2, root2over2], [-0.5, root3over2]];

exports.default = Ray;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _point = __webpack_require__(4);

var _point2 = _interopRequireDefault(_point);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Level = function () {
  function Level(context, walls) {
    _classCallCheck(this, Level);

    this.walls = walls;
    this.context = context;
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

var _ray = __webpack_require__(2);

var _ray2 = _interopRequireDefault(_ray);

var _board = __webpack_require__(0);

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
    this.eaten = false;

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
      this.c.arc(this.pos[0], this.pos[1], 2, 0, Math.PI * 2, false);
      this.c.fillStyle = "white";
      this.c.strokeStyle = "white";
      this.c.closePath();
      this.c.stroke();
    }
  }, {
    key: 'hasEscaped',
    value: function hasEscaped() {
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

      _ray2.default.DIRECTIONS.forEach(function (dir) {
        new _ray2.default(_this.c, 100, _this.pos, dir[0] * 3, dir[1] * 3, board);
      });
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
  }]);

  return Point;
}();

exports.default = Point;

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
      context.beginPath();
      context.fillStyle = "black";
      context.fillRect(this.x, this.y, this.width, this.height);
      context.closePath();
      context.stroke();
      // context.strokeRect(this.x, this.y, this.width, this.height);
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
    walls: [[0, 0, 0.55, 0.25], [0, 0.3, 0.7, 0.25],
    // [0.2, 0.3, 0.5, 0.25],
    [0.25, 0, 0.4, 0.25], [0, 0, 0.02, 1], [0.8, 0, 0.01, 1]],
    pointStartPos: [.1, .27],
    monsterPositions: [[0.72, 0.24], [0.61, 0.6], [0.5, 0.27]]
  },
  2: {
    walls: [[0.0, 0.01, 1, 0.05], [0.0, 0.01, 0.01, 1], [0, 0.25, 0.8, 0.2], [0.6, 0.6, 0.4, 0.2], [0, 0.45, 0.4, 0.55], [0.4, 0.9, 0.2, 0.1], [0.9, 0, 0.2, 1]],
    pointStartPos: [0.1, 0.1],
    monsterPositions: [[0.55, 0.55], [0.2, 0.1], [0.8, 0.92]]
  },
  3: {
    walls: [[0, 0.1, 0.55, 0.1], [0, 0.01, 1, 0.01], [0, 0, 0.01, 1], [0.9, 0, 0.01, 1], [0.6, 0.1, 0.4, 0.1], [0.2, 0.3, 0.8, 0.5], [0.3, 0.7, 0.1, 0.2], [0.6, 0.6, 0.2, 0.35], [0, 0.98, 0.8, 0.01]],
    pointStartPos: [0.05, 0.05],
    monsterPositions: [[0.6, 0.28], [0.5, 0.90], [0.1, 0.90]]
  },
  4: {
    walls: [[0.1, 0.02, 1, 0.02], [0, 0, 0.2, 0.2], [0, 0.2, 0.2, 0.05], [0.3, 0.2, 0.5, 0.02], [0, 0.4, 0.2, 0.02], [0, 0.2, 0.1, 0.02], [0.1, 0.4, 0.05, 0.02], [0.2, 0.4, 0.5, 0.02], [0, 0, 0.01, 1], [0.9, 0, 0.01, 1], [0.6, 0.1, 0.4, 0.1], [0.2, 0.3, 0.2, 0.3], [0.2, 0.3, 0.2, 0.3], [0.3, 0.7, 0.1, 0.2], [0.6, 0.6, 0.4, 0.35], [0, 0.98, 0.8, 0.5]],
    pointStartPos: [0.8, 0.05],
    // pointStartPos: [0.50, 0.9],
    monsterPositions: [[0.8, 0.4], [0.8, 0.1], [0.55, 0.90], [0.1, 0.9], [0.05, 0.5]]
  }
};

exports.default = LEVELS;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

var _ray = __webpack_require__(2);

var _ray2 = _interopRequireDefault(_ray);

var _board = __webpack_require__(0);

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Monster = function () {
  function Monster(context, canvas, startingPos, board) {
    _classCallCheck(this, Monster);

    this.c = context;
    this.pos = [startingPos[0] * canvas.width, startingPos[1] * canvas.height];
    this.dx = 5;
    this.dy = -5;
    this.awake = false;
    this.canvas = canvas;
    this.board = board;
    this.timer = false;
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

  _createClass(Monster, [{
    key: 'draw',
    value: function draw() {
      var _this = this;

      if (this.awake) {
        this.c.beginPath();
        this.c.arc(this.pos[0], this.pos[1], 5, 0, Math.PI * 2, false);
        this.c.fillStyle = "red";
        this.c.strokeStyle = "red";
        this.c.closePath();
        this.c.fill();
        this.c.stroke();
        if (!this.timer) {
          setInterval(function () {
            return _this.makeSound(_this.board);
          }, 1000); //add pulsing effect for monster;
          this.timer = true;
        }
      }
    }
  }, {
    key: 'move',
    value: function move() {
      // goal is to move toward the player
      var delta = void 0;

      if (this.awake) {
        delta = [Math.ceil(this.board.point.pos[0] - this.pos[0]), Math.ceil(this.board.point.pos[1] - this.pos[1])];

        var newYDir = this.yDir;

        var deltaMagnitude = Math.sqrt(Math.pow(delta[0], 2) + Math.pow(delta[1], 2));
        var unitVector = delta.map(function (dir) {
          return dir / deltaMagnitude;
        });
        var nextPos = this.pos.map(function (posDir, index) {
          return posDir + unitVector[index];
        });
        var nextPosX = [nextPos[0], this.pos[1]];
        var nextPosY = [this.pos[0], nextPos[1]];
        var newPos = nextPos;

        if (this.board.collides(newPos)) {
          //if it collides with the new point
          newPos = [nextPos[0], this.pos[1]]; //only move the x value, keep y steady
          if (this.board.collides(newPos)) {
            // if still collides only move y and keep x steady
            newPos = [this.pos[0], nextPos[1]];
          }
          if (this.board.collides(newPos)) return;
        }
        this.pos = newPos;

        //
        // if (this.board.collides(nextPos)){
        //   if (this.board.collides(nextPos)){
        //     nextPos = [this.pos[0], nextPos[1]];
        //   }
        // }
        //
        //
        // if (this.board.collides(nextPosY)) this.pos = nextPosX;
        // if (this.board.collides(nextPosX)) this.pos = nextPosY;
        // if (this.board.collides(nextPosX) && this.board.collides(nextPosY)) return;
        // if (!this.board.collides(nextPos)) this.pos = nextPos;
      }
    }
  }, {
    key: 'makeSound',
    value: function makeSound(board) {
      var _this2 = this;

      _ray2.default.DIRECTIONS.forEach(function (dir) {
        new _ray2.default(_this2.c, 100, _this2.pos, dir[0] * 3, dir[1] * 3, board, true);
      });
    }
  }]);

  return Monster;
}();

exports.default = Monster;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _wall = __webpack_require__(5);

var _wall2 = _interopRequireDefault(_wall);

var _levels_structure = __webpack_require__(6);

var _levels_structure2 = _interopRequireDefault(_levels_structure);

var _level = __webpack_require__(3);

var _level2 = _interopRequireDefault(_level);

var _point = __webpack_require__(4);

var _point2 = _interopRequireDefault(_point);

var _ray = __webpack_require__(2);

var _ray2 = _interopRequireDefault(_ray);

var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

var _board = __webpack_require__(0);

var _board2 = _interopRequireDefault(_board);

var _monster = __webpack_require__(7);

var _monster2 = _interopRequireDefault(_monster);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
  startGame();
});

var hideSplashText = function hideSplashText(event) {
  if (event && event.key && event.key.startsWith("Arrow")) {
    event.preventDefault();
  }
  var introText = document.getElementById("game-intro");
  var canvas = document.getElementById("canvas");
  introText.classList.add("hidden");
  canvas.classList.remove("hidden");
  document.removeEventListener("keydown", hideSplashText);
};

var startGame = function startGame() {
  var body = document.getElementsByTagName('body')[0];
  var canvas = document.getElementById('canvas');
  setTimeout(function () {
    canvas.width = body.offsetWidth;
    canvas.height = body.offsetHeight;
    var ctx = canvas.getContext("2d");
    var levelCount = 1;
    var game = new _game2.default(ctx, canvas, levelPassed, playerEaten, gameCompleted);
    document.addEventListener("keydown", hideSplashText);
  }, 10);
};

var gameTransitions = {
  1: "Looks like you passed level 1. But the first level is always the easiest. Let's see how you do on the next one...",
  2: "Well, well, well. You're better than I thought. But can you handle level 3?",
  3: "You've earned my respect, young padawan. But no mortal has beaten the final level."
};

var gameCompleted = function gameCompleted() {
  var gameText = hideGamePlay();
  var htmlToDisplay = '\n  <div id="game-complete"> <h2>Congratulations & thanks for playing!</h2> <br/>\n  If you\'d like to know more about this game (or me!) check out the links below: <br>\n    <a href="https://github.com/srekhi/escape_room">\n      <i class="fa fa-github" aria-hidden="true"></i>\n    </a>\n\n    <a href="https://www.linkedin.com/in/rohit-rekhi/">\n      <i class="fa fa-linkedin-square" aria-hidden="true"></i>\n    </a> <br/>\n    <button id="play-again"">Play again?</button>\n    </div>\n  ';

  gameText.innerHTML = htmlToDisplay;
  document.getElementById("play-again").addEventListener("click", restartGame);
};

var restartGame = function restartGame() {
  hideSplashText();
  startGame();
};

var hideGamePlay = function hideGamePlay() {
  var gameText = document.getElementById('game-intro');
  var canvas = document.getElementById("canvas");
  canvas.classList.add("hidden");
  gameText.classList.remove("hidden");
  return gameText;
};

var levelPassed = function levelPassed(levelNum) {
  var gameText = hideGamePlay();
  gameText.innerHTML = '<h3>' + gameTransitions[levelNum] + '</h3>';
  if (levelNum === 4) {
    startGame();
  } else {
    setTimeout(hideSplashText, 3000);
  }
};

var playerEaten = function playerEaten() {
  var gameText = hideGamePlay();

  gameText.innerHTML = '\n    <h3 id="consumed">You have been eaten.\n        An untimely death for so promising of a player.\n        If you think you can handle it, press any key to try again.\n    </h3>';
  setTimeout(document.addEventListener("keypress", hideSplashText), 1000);
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map