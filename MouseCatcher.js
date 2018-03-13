
var bugs = [];
var graymousePic;
var blackmousePic;
var brownmousePic;
var whitemousePic;
var lifePic;
var bgPic;
var score;
var totalClicks; // how many times the user has clicked (for accuracy)
var playing; // aids with asychronous endGame() function

var speed; // speed at which the bugs travel
var bugChance; // chance of a new bug being pushed
var gameLife;
var cheese1;
var cheese2;
var cheese3;
var cheese3plus;
var loadingMTM;
var loadingMTMTime = 350;
var myFont;
var blackBG;
var exitHowto = false;
var howToImage;
var exitImage;
var exit;
function setup() {
  myFont = loadFont('WCRoughTrad.ttf');

  loadingMTM = loadGif('loadingMTM.gif');
  graymousePic = loadImage("mouse.png");
  blackmousePic = loadImage("blackmouse.png");
  brownmousePic = loadImage("brownmouse.png");
  whitemousePic = loadImage("whitemouse.png");
  blackBG = loadImage("blackBG.png");
  howToImage = loadImage("howTo.png");
  exitImage = loadImage("exit.png");
  exit = new Exit();

lifePic = loadGif('cheeseLife.gif');
  bgPic = loadImage("bg.png");
  cheese1 = loadGif('cheeseLife.gif');
  cheese2 = loadGif('cheeseLife.gif');
  cheese3 = loadGif('cheeseLife.gif');
  cheese3plus = loadGif('cheeseLife.gif');

  createCanvas(window.innerWidth, window.innerHeight);
gameLife = 3;
  score = 0;
	totalClicks = 0;
  playing = true;

	speed = 3;
	bugChance = 0.9;
  textSize(30);

}

function draw() {

  background('#000000');
  if (loadingMTMTime > 0) {
  if (loadingMTM.loaded()) {

    loadingMTMTime--;
    image(loadingMTM, 0, 0, width, height);
  }
} else if (loadingMTMTime == 0 && !exitHowto) {
  image(bgPic, 0 ,0, width, height);
  image(howToImage, 50 ,height/4, width-100, height/2);
  image(exitImage, width-100 ,height/4, 75, 75);
  fill(255);
  noStroke();
  textSize(75);
  textAlign(CENTER);
  textFont(myFont);
  text("MOUSE TRAP", width / 2, 100);
  text("MONDAY", width / 2, 200);
  if (exit.isClicked(mouseX, mouseY) && !exitHowto) {
        exitHowto = true;

}
}
  else if (exitHowto == true) {
    image(bgPic, 0 ,0, width, height);
    handleBugs();
    attemptNewBug(frameCount);
    handleDifficulty(frameCount, score);
    drawScore();
    gameOver(playing);
  }
}


/**
 * handles user input
 * squashes bugs
 */
function mousePressed() {

  for (var i = 0; i < bugs.length; i++) {

		// update bug's state
    bugs[i].squashed = bugs[i].squashedBy(mouseX, mouseY);

		// if the bug is good, end the game
    if (bugs[i].squashed && bugs[i].type)
      gameLife++;
    }

	totalClicks++;
}

/**
 * updates and draws bugs
 * handles off-screen bugs
 * handles bugs array
 */
function handleBugs() {

	for (var i = bugs.length - 1; i >= 0; i--) {

		/* update & draw */
    bugs[i].update();
    bugs[i].draw();

    if (bugs[i].position.y > height && !bugs[i].type) {
			// if the bug is off the screen and it's a bad bug
      gameLife--;
      console.log("remove life")
      bugs.splice(i, 1);

      if (gameLife <=0) {
        endGame();
      }
		}

    if (bugs[i].squashed) {
			// remove from bugs array

      bugs.splice(i, 1);
      score++;
    }
  }
}

/**
 * attempts to push a new bug
 */
function attemptNewBug(frame) {

	if (frame % 10 === 0) { // every second

		if (random() < bugChance) { // probability of a new bug

			var x = random(width / 2) + width / 4; // only in the middle
			var type = (random() > 0.995); // good or bad bug
			bugs.push(new Insect(x, type));
		}
	}
}

/**
 * variables pertaining to difficulty
 * is set based upon frame and score
 */
function handleDifficulty(frame, score) {

	if (frame % 60 === 0) {
		// update once every second

		bugChance = map(score, 0, 500, 0.4, 0.999);
		speed = map(score, 0, 500, 3, 30);
	}
}

/**
 * draws game over message
 */
function gameOver(playing) {

	if (!playing) {
		// only if the game has ended

    image(blackBG,30,height/2-150, width-60, 350);
    tint(255, 126);  // Display at half opacity


		fill(255);
		noStroke();
		textSize(150);
		textAlign(CENTER);
    textFont(myFont);

		text("Game Over!", width / 2, height / 2);

		// prevent division by zero
		totalClicks = (totalClicks === 0) ? 1 : totalClicks;
    textFont(myFont);
		var accuracy = Math.round(score / totalClicks * 100);
		textSize(75);
		text("Catch Accuracy: " + accuracy + "%",
			width / 2, height / 2 + 100);
		textAlign(LEFT);
  }
}

/**
 * draws the score
 */
function drawScore() {

  /* draw score */
  fill(255);
  noStroke();
  text(score, width/2, 200);
  textAlign(CENTER);
  textSize(200);
  textFont(myFont);


if (gameLife > 3) {
  image(cheese3plus, 750, height-300, 200, 200);
  image(cheese3, 520, height-300, 200, 200);
  image(cheese2, 275, height-300, 200, 200);
  image(cheese1, 50, height-300, 200, 200);

} else if (gameLife == 3) {
  image(cheese3, 750, height-300, 200, 200);
  image(cheese2, 400, height-300, 200, 200);
  image(cheese1, 45, height-300, 200, 200);


} else  if (gameLife == 2) {
  image(cheese2, 560, height-300, 200, 200);
  image(cheese1, 200, height-300, 200, 200);

} else if (gameLife == 1) {
  image(cheese1, width/2-100, height-300, 200, 200);

}

}

/**
 * stops the loop, triggers game over
 */
function endGame() {

  playing = false;
  noLoop();
}
