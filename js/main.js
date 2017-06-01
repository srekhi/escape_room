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
});

const hideSplashText = (event) => {
  if (event && event.key && event.key.startsWith("Arrow")) {
    event.preventDefault();
  }
  let introText = document.getElementById("game-intro");
  let canvas = document.getElementById("canvas");
  introText.classList.add("hidden");
  canvas.classList.remove("hidden");
  document.removeEventListener("keydown", hideSplashText);
};

const startGame = () =>{
  const body = document.getElementsByTagName('body')[0];
  const canvas = document.getElementById('canvas');
  setTimeout( ()=> {
    canvas.width = body.offsetWidth;
    canvas.height = body.offsetHeight;
    const ctx = canvas.getContext("2d");
    let levelCount = 1;
    const game = new Game(ctx, canvas, levelPassed, playerEaten, gameCompleted);
    document.addEventListener("keydown", hideSplashText);
  }, 10);
};

const gameTransitions = {
  1: "Looks like you passed level 1. But the first level is always the easiest. Let's see how you do on the next one...",
  2: "Well, well, well. You're better than I thought. But can you handle level 3?",
  3: "You've earned my respect, young padawan. But no mortal has beaten the final level.",
};

const gameCompleted = () => {
  let gameText = hideGamePlay();
  let htmlToDisplay = `
  <div id="game-complete"> <h2>Congratulations & thanks for playing!</h2> <br/>
  If you'd like to know more about this game (or me!) check out the links below: <br>
    <a href="https://github.com/srekhi/escape_room">
      <i class="fa fa-github" aria-hidden="true"></i>
    </a>

    <a href="https://www.linkedin.com/in/rohit-rekhi/">
      <i class="fa fa-linkedin-square" aria-hidden="true"></i>
    </a> <br/>
    <button id="play-again"">Play again?</button>
    </div>
  `;


  gameText.innerHTML = htmlToDisplay;
  document.getElementById("play-again").addEventListener("click", restartGame);
};

const restartGame = () => {
  hideSplashText();
  startGame();
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
    <h3 id="consumed">The monsters have caught you.
        An untimely death for so promising of a player.
        If you think you can handle it, press any key to try again.
    </h3>`;
    setTimeout(document.addEventListener("keypress", hideSplashText), 1000);
};
