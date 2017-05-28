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
    this.width = width;
    this.height = height;
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function () {
  function Point(context, startingPos) {
    _classCallCheck(this, Point);

    this.c = context;
    this.pos = startingPos;
    this.dx = 1;
    this.dy = 1;
    this.moving = false;
    this.draw();
    this.animate = this.animate.bind(this);
  }

  _createClass(Point, [{
    key: "draw",
    value: function draw() {
      this.c.beginPath();
      this.c.arc(this.pos[0], this.pos[1], 5, 0, Math.PI * 2, false);
      this.c.fillStyle = "white";
      this.c.stroke();
    }
  }, {
    key: "move",
    value: function move(direction) {
      this.moving = true;
      if (direction === "right") {
        this.pos[0] += 1;
      } else if (direction === "left") {
        this.pos[0] -= 1;
      } else if (direction === "up") {
        this.pos[1] -= 1;
      } else if (direction === "down") {
        this.pos[1] += 1;
      }
      this.draw();
    }
  }, {
    key: "stopMoving",
    value: function stopMoving() {
      this.moving = false;
      window.cancelAnimationFrame(window.animationFrameId);
    }
  }, {
    key: "animate",
    value: function animate(point, direction) {
      var _this = this;

      point.move(direction);
      window.animationFrameId = window.requestAnimationFrame(function () {
        if (_this.moving) {
          _this.animate(point, direction);
        }
      });
    }
  }, {
    key: "handleCollision",
    value: function handleCollision() {}
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
    this.c.strokeStyle = "blue";
    this.xGrowthFactor = xGrowthFactor;
    this.yGrowthFactor = yGrowthFactor;
  }

  _createClass(Ray, [{
    key: "grow",
    value: function grow() {
      while (this.lifespan > 0) {
        this.head[0] += this.yGrowthFactor;
        this.head[1] += this.xGrowthFactor;
        this.c.lineTo(this.head[0], this.head[1]);
        this.c.strokeStyle = "blue";
        this.c.stroke();
        this.lifespan -= 1;
      }
    }
  }, {
    key: "handleCollision",
    value: function handleCollision(wall) {}
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
var Game = function Game(context, walls, point) {
  var _this = this;

  _classCallCheck(this, Game);

  this.context = context;
  this.walls = walls;
  this.point = point;
  var level = new _level2.default(context, walls);
  level.draw();
  point.draw();

  document.addEventListener("keydown", function (event) {
    if (event.key === "w") {
      _this.point.animate(_this.point, "up");
    } else if (event.key === "a") {
      _this.point.animate(_this.point, "left");
    } else if (event.key === "s") {
      _this.point.animate(_this.point, "down");
    } else if (event.key === "d") {
      _this.point.animate(_this.point, "right");
    } else if (event.key === " ") {
      var ray = new _ray2.default(context, _this.point.pos);
      ray.grow();
    }
  });

  document.addEventListener("keyup", function (event) {
    point.stopMoving();
  });
};

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