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
  let p = new Point(ctx, [0, window.innerHeight / 2 + 25]);
  const board = new Board(ctx, p);
  window.game = new Game(ctx, board, p);
});

const hideSplashText = () => {
  let introText = document.getElementById("game-intro");
  introText.classList.add("hidden");
  document.removeEventListener("keypress", hideSplashText);
};
