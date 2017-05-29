import Wall from './wall';
import Level from './level';
import Point from './point';
import Ray from './ray';
import Game from './game';
import Board from './board';
document.addEventListener("DOMContentLoaded", ()=>{
  const canvas = document.getElementById('canvas');
  document.addEventListener("keypress", hideSplashText);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  (0, 0, window.innerWidth / 10, window.innerHeight)
  let p = new Point(ctx, [window.innerWidth / 30 + 5, window.innerHeight / 2 + 25]);
  const board = new Board(ctx, p);
  window.game = new Game(ctx, board, p);
});

const hideSplashText = () => {
  let introText = document.getElementById("game-intro");
  let canvas = document.getElementById("canvas");
  introText.classList.add("hidden");
  canvas.classList.remove("hidden");
  document.removeEventListener("keypress", hideSplashText);
};
