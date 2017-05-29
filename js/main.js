import Wall from './wall';
import LEVELS from './levels_structure';
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
  let levelCount = 1;
  const game = new Game(ctx, canvas, levelPassed);
  document.addEventListener("keypress", hideSplashText);
});

const hideSplashText = () => {
  let introText = document.getElementById("game-intro");
  let canvas = document.getElementById("canvas");
  introText.classList.add("hidden");
  canvas.classList.remove("hidden");
  document.removeEventListener("keypress", hideSplashText);
};

const levelPassed = (levelNum) => {
  const gameText = document.getElementById('game-intro');
  const canvas = document.getElementById("canvas");
  canvas.classList.add("hidden");
  gameText.classList.remove("hidden");
  debugger;

  gameText.innerHTML = `<h3> Looks like you passed level ${levelNum} . But don't get too excited. You're not in the clear yet! </h3>`;

  setTimeout(hideSplashText, 5000);
};
