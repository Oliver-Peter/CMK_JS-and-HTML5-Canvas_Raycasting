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
      oldCycleTime = startTime;
      var cycleTime = startTime - oldCycleTime;
      
      if (cycleCount % 60 == 0) {
        fps_rate = Math.floor(1000 / cycleTime);
      }

      // resize canvas
      canvas.width = window.innerWidth * 0.3; 
      canvas.height = window.innerHeight * 0.3;

      // update screen
      context.fillStyle = 'black'; //Füllfarbe = schwar
      context.fillRect(0, 0, canvas.width, canvas.height); // Füllt die Farbe gemäss den Anfangs- und Endkoordinaten auf.

      context.fillStyle = 'white';
      context.fillRect(canvas.width / 2 - HALF_WIDTH, canvas.height / 2 - HALF_HEIGHT, WIDTH, HEIGHT);


      /*Der folgende Codeblock generiert ein weisses 32x32px grosses Quadrat, welches sich von der X-Position 0 zur X-Position 32 bewegt.*/
     
    /*context.fillStyle = 'white';
      context.fillRect(i * 32, 30, 32, 32);
      if(i >= 32) {
        i = 0;
      }
      i++ */

      // infinite loop
      setTimeout(gameLoop, cycleDelay); //Der gameLoop soll sich unendlich wiederholen, Dies wird mit der setTimeout Funktion gewährleistet

      // render FPS to Screen
      context.fillStyle = 'white';
      context.font = '10px Monospace';
      context.fillText('FPS: ' + fps_rate, 0, 30);

    };

    //nach jedem Laden des Browserfenster soll auch der gameLoop ausgeführt werden.
    window.addEventListener('load', () => {
      gameLoop();
    })