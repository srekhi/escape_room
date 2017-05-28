import Wall from './wall';
import Level from './level';
import Point from './point';
import Ray from './ray';
import Game from './game';
import Board from './board';
document.addEventListener("DOMContentLoaded", ()=>{
  const canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  const board = new Board();
  let p = new Point(ctx, [0, window.innerHeight / 2 + 25] );
  window.game = new Game(ctx, board, p);
});
