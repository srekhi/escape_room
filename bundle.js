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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _wall = __webpack_require__(0);

var _wall2 = _interopRequireDefault(_wall);

var _level = __webpack_require__(2);

var _level2 = _interopRequireDefault(_level);

var _point = __webpack_require__(3);

var _point2 = _interopRequireDefault(_point);

var _ray = __webpack_require__(4);

var _ray2 = _interopRequireDefault(_ray);

var _game = __webpack_require__(5);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext("2d");
  var walls = [new _wall2.default(0, 0, window.innerWidth / 2, window.innerHeight / 2), new _wall2.default(0, window.innerHeight / 2 + 50, window.innerWidth, window.innerHeight / 2), new _wall2.default(window.innerWidth / 2 + 50, 0, window.innerWidth / 2, window.innerHeight)];

  var p = new _point2.default(ctx, [0, window.innerHeight / 2 + 25]);
  window.game = new _game2.default(ctx, walls, p);
});

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

var _game = __webpack_require__(5);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function () {
  function Point(context, startingPos) {
    _classCallCheck(this, Point);

    this.c = context;
    this.pos = startingPos;
    this.dx = 5;
    this.dy = -5;
    this.moving = false;
    this.draw();
    this.animate = this.animate.bind(this);
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
    key: "draw",
    value: function draw() {
      this.c.beginPath();
      this.c.arc(this.pos[0], this.pos[1], 5, 0, Math.PI * 2, false);
      this.c.fillStyle = "blue";
      this.c.strokeStyle = "blue";

      this.c.stroke();
    }
  }, {
    key: "move",
    value: function move(direction) {
      var delta = void 0;
      this.moving = true;
      delta = this.movementDeltas[direction];
      this.pos = this.nextPos(direction);
      this.draw();
    }
  }, {
    key: "makeSound",
    value: function makeSound() {
      console.log("WAVY");
      //make the rays here.
    }
  }, {
    key: "nextPos",
    value: function nextPos(direction) {
      var delta = void 0;
      delta = this.movementDeltas[direction] || [0, 0]; //in case key pressed is irrelevant
      return this.pos.map(function (posDir, index) {
        return posDir + delta[index];
      });
    }
  }, {
    key: "stopMoving",
    value: function stopMoving() {
      this.moving = false;
      window.cancelAnimationFrame(window.animationFrameId);
    }
  }, {
    key: "collides",
    value: function collides() {
      return _game2.default.collides(this.pos);
    }
  }, {
    key: "animate",
    value: function animate(direction) {
      var _this = this;

      // this.c.clearRect(0, 0, innerHeight, innerWidth);
      this.move(direction);
      window.animationFrameId = window.requestAnimationFrame(function () {
        if (_this.moving) {
          _this.animate(direction);
          if (_this.collides()) _this.stopMoving();
        }
      });
    }
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ray = function () {
  function Ray(context, startPos, xGrowthFactor, yGrowthFactor) {
    _classCallCheck(this, Ray);

    this.c = context;
    this.lifespan = 100; //milliseconds
    this.head = startPos;
    this.tail = startPos;
    this.c.beginPath();
    this.c.moveTo(startPos[0], startPos[1]);
    this.c.lineTo(startPos[0] + 10, startPos[1] + 10);
    this.c.strokeStyle = "blue";
    this.c.stroke();
    this.xGrowthFactor = xGrowthFactor;
    this.yGrowthFactor = yGrowthFactor;
  }

  _createClass(Ray, [{
    key: "grow",
    value: function grow() {
      while (this.lifespan > 0) {
        console.log(this.lifespan);
        this.head[0] += this.xGrowthFactor;
        this.head[1] += this.yGrowthFactor;
        this.c.lineTo(this.head[0], this.head[1]);
        this.c.strokeStyle = "blue";
        this.c.stroke();
        this.lifespan -= 1;
        console.log(this.head[0], this.head[1]);
      }
    }
  }, {
    key: "handleCollision",
    value: function handleCollision() {}
  }]);

  return Ray;
}();

exports.default = Ray;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wall = __webpack_require__(0);

var _wall2 = _interopRequireDefault(_wall);

var _level = __webpack_require__(2);

var _level2 = _interopRequireDefault(_level);

var _point = __webpack_require__(3);

var _point2 = _interopRequireDefault(_point);

var _ray = __webpack_require__(4);

var _ray2 = _interopRequireDefault(_ray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// let walls = [
//   new Wall(0, 0, window.innerWidth /2, window.innerHeight / 2),
//   new Wall(0, window.innerHeight/2 + 50, window.innerWidth, window.innerHeight / 2),
//   new Wall(window.innerWidth/2 + 50, 0, window.innerWidth /2, window.innerHeight)
// ];
var Game = function () {
  function Game(context, walls, point) {
    _classCallCheck(this, Game);

    this.context = context;
    this.walls = walls;
    this.point = point;
    var level = new _level2.default(context, walls);
    level.draw();
    point.draw();
    this.keyStatus = {}; //keep tally of which keys are pressed down.
    // this.directions = { "w": "up", "s":"down", "d":"right", "a": "left"};
    this.createEventListeners();
  }

  _createClass(Game, [{
    key: 'createEventListeners',
    value: function createEventListeners() {
      var _this = this;

      window.addEventListener("keydown", function (event) {
        _this.keyStatus[event.key] = true;
        var direction = _this.assignDirection();
        if (!_this.collides(_this.point.nextPos(direction))) {
          _this.point.move(direction);
        }
      });
      window.addEventListener("keydown", function (event) {
        if (event.key === " ") {
          event.preventDefault();
          _this.point.makeSound();
        }
      });
      window.addEventListener("keyup", function (event) {
        _this.keyStatus[event.key] = false;
        // this.point.stopMoving();
      });
    }
  }, {
    key: 'assignDirection',
    value: function assignDirection() {
      if (this.keyStatus["w'"] && this.keyStatus["a"]) {
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
      return this.walls.some(function (wall) {
        return !(coords[0] < wall.topLeft[0] || coords[0] > wall.bottomRight[0] || coords[1] < wall.topLeft[1] || coords[1] > wall.bottomRight[1]);
      }); //if any of these 4 conditions are met, no collision.
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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map