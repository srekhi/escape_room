import Wall from './wall';
import LEVELS from './levels_structure';
import Level from './level';
import Point from './point';
import Ray from './ray';
import Game from './game';
import Board from './board';
import Monster from './monster';

document.addEventListener("DOMContentLoaded", ()=>{
  startGame();
  // (0, 0, window.innerWidth / 10, window.innerHeight)

  // this.wallDimensions = [
  //           [0, 0, 0.55, 0.25],
  //           [0, 0.3, 0.7, 0.25],
  //           [0.25, 0, 0.4, 0.25],
  //           [0, 0, 0.02, 1],
  //       ];

});

const hideSplashText = (event) => {
  console.log();
  if (event && event.key.startsWith("Arrow")) event.preventDefault();
  let introText = document.getElementById("game-intro");
  let canvas = document.getElementById("canvas");
  introText.classList.add("hidden");
  canvas.classList.remove("hidden");
  document.removeEventListener("keydown", hideSplashText);
};

const startGame = () =>{
  const canvas = document.getElementById('canvas');
  const body = document.getElementsByTagName('body')[0];
  
  canvas.width = body.offsetWidth; //grab body width
  canvas.height = window.innerHeight; //viewport height
  const ctx = canvas.getContext("2d");
  let levelCount = 1;
  const game = new Game(ctx, canvas, levelPassed, playerEaten);
  document.addEventListener("keydown", hideSplashText);
};

const gameTransitions = {
  1: "Looks like you passed level 1. But the first level is always the easiest. Let's see how you do on the next one...",
  2: "Well, well, well. You're better than I thought. But can you handle level 3?",
  3: "You've earned my respect, young padawan. But no man has beaten the final level.",
  4: "You are a god amongst men. Congratulations on your remarkable success. I am not worthy. Once more?"
};


const levelPassed = (levelNum) => {
  const gameText = document.getElementById('game-intro');
  const canvas = document.getElementById("canvas");
  canvas.classList.add("hidden");
  gameText.classList.remove("hidden");

  gameText.innerHTML = `<h3>${gameTransitions[levelNum]}</h3>`;
  if (levelNum === 4){
    startGame();
  } else{
    setTimeout(hideSplashText, 3000);
  }
};

const playerEaten = () => {
  const gameText = document.getElementById('game-intro');
  const canvas = document.getElementById("canvas");
  canvas.classList.add("hidden");
  gameText.classList.remove("hidden");

  gameText.innerHTML = `
    <h3 id="consumed">You have been eaten.
        An untimely death for so promising of a player.
        If you think you can handle it, press any key to try again.
    </h3>`;
    document.addEventListener("keypress", hideSplashText);
};
