import Wall from './wall';
import Level from './level';
import Point from './point';

document.addEventListener("DOMContentLoaded", ()=>{
  const canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  // new Wall(x, y, height, width);

  let walls = [
    new Wall(0, 0, window.innerWidth /2, window.innerHeight / 2),
    new Wall(0, window.innerHeight/2 + 50, window.innerWidth, window.innerHeight / 2),
    new Wall(window.innerWidth/2 + 50, 0, window.innerWidth /2, window.innerHeight)
  ];

  let p = new Point(ctx, [0, window.innerHeight / 2 + 25] );
  let level1 = new Level(ctx, walls);
  level1.draw();
  p.draw();
  document.addEventListener("keypress", event => {
    if (event.key === "w"){
      animate(p,"up");
    }else if (event.key === "a") {
      animate(p,"left");
    }else if (event.key === "s"){
      animate(p,"down");
    }else if (event.key === "d"){
      animate(p,"right");
    }
  });
});


function animate(point, direction){
  console.log(direction);
  point.move(direction);
  requestAnimationFrame(() =>{
    animate(point, direction);
  });
}
