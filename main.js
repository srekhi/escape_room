import Wall from './wall';
import Level from './level';
import Point from './point';
import Ray from './ray';
import Game from './game';
document.addEventListener("DOMContentLoaded", ()=>{
  const canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  let walls = [
    new Wall(0, 0, window.innerWidth /2, window.innerHeight / 2),
    new Wall(0, window.innerHeight/2 + 50, window.innerWidth, window.innerHeight / 2),
    new Wall(window.innerWidth/2 + 50, 0, window.innerWidth /2, window.innerHeight)
  ];

  let p = new Point(ctx, [0, window.innerHeight / 2 + 25] );
  window.game = new Game(ctx, walls, p);
});
