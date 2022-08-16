// init canvas
const canvas = document.querySelector("#screen");
const context = canvas.getContext('2d');

// FPS variables
const FPS = 60; // steht für 60 frames pro Sekunde
const cycleDelay = Math.floor(1000 / FPS);
let oldCycleTime = 0;
let cycleCount = 0;
let fps_rate = '...';

var i = 0;

// map
const MAP_SIZE = 16; // MAP-size = 16 Elements
const MAP_SCALE = 10; //MAP_Scale wird später noch auf 64 gesetzt, passen zur 64 Pixle Grafik.
const MAP_RANGE = MAP_SCALE * MAP_SIZE; // Definiert, wie weit die Arrays ausgestrahlt werden.
const MAP_SPEED = (MAP_SCALE / 2) / 10; // Wie schnell bewegt sich der Spieler in Relation zur MAP_SCALE

// Die "visuelle" noch leere Map bestehend aus einem Aray aus 16x16 Elementen.
var map = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];


// screen variables
const WIDTH = 300;
const HALF_WIDTH = 150;
const HEIGHT = 200;
const HALF_HEIGHT = 100;

// game loop
function gameLoop() {

  // calculate FPS
  cycleCount++;
  var startTime = Date.now();
  var cycleTime = startTime - oldCycleTime;
  oldCycleTime = startTime;

  if (cycleCount % 60 == 0) {
    fps_rate = Math.floor(1000 / cycleTime);
  }

  // resize canvas
  canvas.width = window.innerWidth * 0.3;
  canvas.height = window.innerHeight * 0.3;

  // update screen

  // Füllfarbe = weiss
  context.fillStyle = 'white';
  // Füllt die Farbe gemäss den Anfangs- und Endkoordinaten auf
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'black';
  context.fillRect(canvas.width / 2 - HALF_WIDTH, canvas.height / 2 - HALF_HEIGHT, WIDTH, HEIGHT);

  // draw the map
  for (var row = 0; row < MAP_SIZE; row++) {
    for (var col = 0; col < MAP_SIZE; col++) {
      var square = row * MAP_SIZE + col;
      if (map[square] == 1) {
        // Der Rahmen der Map soll mit gegebener Füllfarbe in der Mitte des "Screens" gezeichnet werden.
        context.fillStyle = '#555';
        context.fillRect(Math.floor(canvas.width / 2 - MAP_RANGE / 2) + col * MAP_SCALE,
          Math.floor(canvas.height / 2 - MAP_RANGE / 2) + row * MAP_SCALE, MAP_SCALE, MAP_SCALE);
      } else {
        // Dasselbe gilt für den inneren Berich der Map
        context.fillStyle = '#aaa';
        context.fillRect(Math.floor(canvas.width / 2 - MAP_RANGE / 2) + col * MAP_SCALE,
          Math.floor(canvas.height / 2 - MAP_RANGE / 2) + row * MAP_SCALE, MAP_SCALE, MAP_SCALE);
      }
    }
  }


  // infinite loop
  setTimeout(gameLoop, cycleDelay); //Der gameLoop soll sich unendlich wiederholen, Dies wird mit der setTimeout Funktion gewährleistet

  // render FPS to Screen
  context.fillStyle = 'blacke';
  context.font = '11px Monospace';
  context.fillText('FPS: ' + fps_rate, 0, 30);
};

//nach jedem Laden des Browserfenster soll auch der gameLoop ausgeführt werden.
window.addEventListener('load', () => {
  gameLoop();
})