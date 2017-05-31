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
  console.log('hidden');
  if (event && event.key && event.key.startsWith("Arrow")) event.preventDefault();
  let introText = document.getElementById("game-intro");
  let canvas = document.getElementById("canvas");
  introText.classList.add("hidden");
  canvas.classList.remove("hidden");
  document.removeEventListener("keydown", hideSplashText);
};

const startGame = () =>{
  const body = document.getElementsByTagName('body')[0];
  const canvas = document.getElementById('canvas');
  canvas.width = body.offsetWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  let levelCount = 1;
  const game = new Game(ctx, canvas, levelPassed, playerEaten, gameCompleted);
  document.addEventListener("keydown", hideSplashText);
};

const gameTransitions = {
  1: "Looks like you passed level 1. But the first level is always the easiest. Let's see how you do on the next one...",
  2: "Well, well, well. You're better than I thought. But can you handle level 3?",
  3: "You've earned my respect, young padawan. But no man has beaten the final level.",
};

const gameCompleted = () => {
  let gameText = hideGamePlay();
  let htmlToDisplay = `
  <div id="game-complete"> Congratulations & thanks for playing! <br/>
  If you'd like to know more about this game (or me!) check out the links below: <br>
    <a href="https://github.com/srekhi/escape_room">
      <i class="fa fa-github" aria-hidden="true"></i>
    </a>

    <a href="https://www.linkedin.com/in/rohit-rekhi/">
      <i class="fa fa-linkedin-square" aria-hidden="true"></i>
    </a> <br/>
    Want to play again? <button id="play-again"">Yes!</button>
    </div>
  `;

  gameText.innerHTML = htmlToDisplay;

  document.getElementById("play-again").addEventListener("click", hideSplashText);

};

const hideGamePlay = () => {
  const gameText = document.getElementById('game-intro');
  const canvas = document.getElementById("canvas");
  canvas.classList.add("hidden");
  gameText.classList.remove("hidden");
  return gameText;
};

const levelPassed = (levelNum) => {
  let gameText = hideGamePlay();
  gameText.innerHTML = `<h3>${gameTransitions[levelNum]}</h3>`;
  if (levelNum === 4){
    startGame();
  } else{
    setTimeout(hideSplashText, 3000);
  }
};

const playerEaten = () => {
  let gameText = hideGamePlay();

  gameText.innerHTML = `
    <h3 id="consumed">You have been eaten.
        An untimely death for so promising of a player.
        If you think you can handle it, press any key to try again.
    </h3>`;
    document.addEventListener("keypress", hideSplashText);
};
