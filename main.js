import Wall from './wall';
import Level from './level';
import Point from './point';
import Ray from './ray';
import Game from './game';
import Board from './board';
document.addEventListener("DOMContentLoaded", ()=>{
  const canvas = document.getElementById('canvas');
  const body = document.getElementsByTagName('body')[0];
  canvas.width = body.offsetWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  // (0, 0, window.innerWidth / 10, window.innerHeight)

  // this.wallDimensions = [
  //           [0, 0, 0.55, 0.25],
  //           [0, 0.3, 0.7, 0.25],
  //           [0.25, 0, 0.4, 0.25],
  //           [0, 0, 0.02, 1],
  //       ];
  let p = new Point(ctx, canvas, [0.1 * canvas.width, canvas.height * 0.27]);
  const board = new Board(ctx, canvas, p);
  const game = new Game(ctx, canvas, board, p);
  document.addEventListener("keypress", hideSplashText);
});

const hideSplashText = () => {
  let introText = document.getElementById("game-intro");
  let canvas = document.getElementById("canvas");
  introText.classList.add("hidden");
  canvas.classList.remove("hidden");
  document.removeEventListener("keypress", hideSplashText);
};
