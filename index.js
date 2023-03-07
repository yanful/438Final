//https://workshops.hackclub.com/platformer/
var groundSprites;
var GROUND_SPRITE_WIDTH = 100;
var GROUND_SPRITE_HEIGHT = 100;
var numGroundSprites;
var GRAVITY = 2;
var numGroundSprites;
var mario, mario_running;
var JUMP = -10;
// var obstacleSprites;
var isGameOver;
var score;
var Gooma_running;
var GoomaMonster;
var MarioBullets = [];
var fly_running;
var flyMonster;
let backgroundImage;

window.preload = () => {
  mario_running = loadAnimation("Capture1.png","Capture3.png","Capture4.png");
  Gooma_running = loadAnimation("776e9795421d4a36e17e34bfb1c935e6oFf0FiO7qBS9Nlkn-0.png", "776e9795421d4a36e17e34bfb1c935e6oFf0FiO7qBS9Nlkn-1.png", "776e9795421d4a36e17e34bfb1c935e6oFf0FiO7qBS9Nlkn-3.png", "776e9795421d4a36e17e34bfb1c935e6oFf0FiO7qBS9Nlkn-4.png", "776e9795421d4a36e17e34bfb1c935e6oFf0FiO7qBS9Nlkn-5.png");
  fly_running = loadAnimation("a88572578d16f7b00971c949aecc5812_w200-0.png", "a88572578d16f7b00971c949aecc5812_w200-1.png", "a88572578d16f7b00971c949aecc5812_w200-2.png", "a88572578d16f7b00971c949aecc5812_w200-3.png", "a88572578d16f7b00971c949aecc5812_w200-4.png", "a88572578d16f7b00971c949aecc5812_w200-5.png", "a88572578d16f7b00971c949aecc5812_w200-6.png", "a88572578d16f7b00971c949aecc5812_w200-7.png");
  backgroundImage = loadImage('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6a04ce34-39a0-48c1-8b82-366b00b37586/ddtioa1-1115e6df-f611-4fd3-8329-ef2ec69e635f.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzZhMDRjZTM0LTM5YTAtNDhjMS04YjgyLTM2NmIwMGIzNzU4NlwvZGR0aW9hMS0xMTE1ZTZkZi1mNjExLTRmZDMtODMyOS1lZjJlYzY5ZTYzNWYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.N7h948XXIkP3vLn3b5mzfcSXphCN8ksvqv03vpXLKow');
};
window.setup= () => {
  isGameOver = false;
  score = 3;
  textSize(36);
  createCanvas(windowWidth, windowHeight);
  background(150, 200, 250);
  groundSprites = new Group();
  numGroundSprites = width / GROUND_SPRITE_WIDTH + 1;
  for (var n = 0; n < numGroundSprites; n++) {
    var groundSprite = createSprite(
      n * 100,
      height - 10,
      GROUND_SPRITE_WIDTH,
      GROUND_SPRITE_HEIGHT
    );
    groundSprites.add(groundSprite);
  }
  mario = createSprite(50,height-90,50,50);
  mario.addAnimation("running", mario_running);
  mario.scale = 0.5;
  // obstacleSprites = new Group();
  GoomaMonster = new Group();
  GoomaMonster.addAni("Gooma_running", Gooma_running);
  flyMonster = new Group();
  flyMonster.addAni("fly_running", fly_running);
};
window.draw = () => {
  if (isGameOver) {
    background(backgroundImage);
    fill(255);
    textAlign(CENTER);
    text('Your score was: ' + score, width/2, height/2);
    text(
      'Game Over! Click anywhere to restart',
      width/2,
      height/2 - 100
    );
    // mario.visible = false;
    mario.visible = false;
    mario.velocity.x = 0;
    mario.velocity.y = 0;
    mario.position.x = 50;
    mario.position.y = height-90;
    GoomaMonster.remove();
    groundSprites.remove();
    flyMonster.remove();
    console.log(MarioBullets);
    for (var i = 0; i < MarioBullets.length; i++) {
      MarioBullets[i].remove();
    }
    if (mouseIsPressed) {
      
      console.log("click");
      isGameOver = false;
      score = 0;
      background(150, 200, 250);
      groundSprites = new Group();
      numGroundSprites = width / GROUND_SPRITE_WIDTH + 1;
      for (var n = 0; n < numGroundSprites; n++) {
        var groundSprite = createSprite(
          n * 100,
          height - 10,
          GROUND_SPRITE_WIDTH,
          GROUND_SPRITE_HEIGHT
        );
        groundSprites.add(groundSprite);
      }
      // mario = createSprite(50,height-90,50,50);
      // mario.addAnimation("running", mario_running);
      // mario.scale = 0.5;
      // Reset the game variables
      mario.visible = true;
      score = 3;
      
    }
    // noLoop();
  } else {
    background(150, 200, 250);
    mario.overlap(groundSprites, over);
    // let overlapDetected = obstacleSprites.overlap(mario, endGame);
    // console.log("Overlap detected:", overlapDetected);
    // if (groundSprites.overlap(mario)) {
    //   mario.velocity.y = 0;
    //   mario.position.y = (height-75) - (mario.height/2);
    //   console.log("check it");
    // };
    mario.addSpeed(0.25, 90);
    mario.addSpeed(0.1, 0);
    mario.position.x = mario.position.x + 3;
    if (kb.presses('w') && mario.position.y >= height - 100) {
      mario.velocity.y = JUMP;

        
        // mario.velocity.y -= GRAVITY;
    }



    document.addEventListener('keydown', function(event) {
      if (event.key === 'a') {
        mario.velocity.x = -10;
      }
      if (event.key === 'd') {
        mario.velocity.x = 1;
      }
    });
    if (mario.velocity.x > 1) {
      mario.velocity.x = 1;
    }
    if (mario.position.y < 0) {
      mario.velocity.y = GRAVITY;
    }
    // if (key == "s") {
    //   mario.velocity.y = GRAVITY + 2;
    // }
    camera.position.x = width / 2;
    if (mario.position.x > width * 2 / 3) {
      mario.position.x = width * 2 / 3;
    }
    if (mario.position.x < 0) {
      mario.position.x = 0;
    }
    if (kb.pressed('space')) {
      var bullet = createSprite(mario.position.x + 10, mario.position.y -20, 20, 20);
      bullet.shapeColor = color(255, 255, 255);
      bullet.velocity.x = 2;
      bullet.velocity.y = 0;
      bullet.position.y = mario.position.y;
      MarioBullets.push(bullet);
      score = score - 1;
    }
    if (score < 0) {
      endGame();
    }
    var firstGroundSprite = groundSprites[0];
    if (firstGroundSprite.position.x <= -10) {
      groundSprites.remove(firstGroundSprite);
      firstGroundSprite.position.x = numGroundSprites*firstGroundSprite.width;
      firstGroundSprite.position.y = height - 10;
      groundSprites.add(firstGroundSprite);
    }
    if (random() > 0.995) {
      let new_Gooma = new GoomaMonster.Sprite(width, height-100, 100, 100);
      // new GoomaMonster.Sprite(width, height-100, 50, 50);
      // Gooma = createSprite(width,height-100,50,50);
      // Gooma.addAnimation("running", Gooma_running);
      new_Gooma.scale = 0.3;
      // GoomaMonster.add(Gooma)
    }
    if (random() > 0.995) {
      let new_fly = new flyMonster.Sprite(width, random(height-400, height - 200), 100, 100);
      new_fly.scale = 0.3;
    }
    for (var i = 0; i < GoomaMonster.length; i++) {
      GoomaMonster[i].position.x -= 5;
      // GoomaMonster[i].overlap(mario, endGame);
      if (mario.overlap(GoomaMonster[i])) {
      // if (mario.overlap(GoomaMonster[i], {preventOverlap: true})) {
        // check if the player is jumping
        if (mario.position.y < height-90) {
          // the player is jumping, remove the monster
          GoomaMonster[i].remove();
          score = score + 1;
        } else {
          // the player is not jumping, end the game
          endGame();
        }
      } else {
        GoomaMonster[i].position.x -= 0.5;
      }
    }
    for (var i = 0; i < flyMonster.length; i++) {
      flyMonster[i].position.x -= 5;
      if (mario.overlap(flyMonster[i])) {
        endGame();
      } else {
        flyMonster[i].position.x -= 0.5;
      }
    }


    for (var i = 0; i < MarioBullets.length; i++) {
      MarioBullets[i].position.x += 5;
      for (var j = 0; j < GoomaMonster.length; j++) {
        if (MarioBullets[i].overlap(GoomaMonster[j])) {
          GoomaMonster[j].remove();
          MarioBullets[i].remove();
        }
      }
    }
    
    
    // if (random() > 0.97) {
    //   var obstacle = createSprite(width,random(100, height-50),50,50);
    //   obstacleSprites.add(obstacle)
    // }

    // for (var i = 0; i < obstacleSprites.length; i++) {
    //   obstacleSprites[i].position.x -= 5;
    //   obstacleSprites[i].overlap(mario, endGame);
    // }
    for (var i = 0; i < groundSprites.length; i++) {
      groundSprites[i].position.x -= 5;
    }
    
    drawSprites();
    textAlign(CENTER);
    text("Score: " + score, 100, 60);
  }
};

function endGame() {
  isGameOver = true;
  console.log("ii");
}



function over(mario, groundSprites) {
  mario.velocity.y = 0;
  mario.position.y = height - 90;
}
// function mouseClicked() {
//   if (isGameOver) {
//     // Reset the game variables
//     for (var n = 0; n < numGroundSprites; n++) {
//       var groundSprite = groundSprites[n];
//       groundSprite.position.x = n * 50;
//     }

//     mario.position.x = 50;
//     mario.position.y = height - 90;

//     obstacleSprites.removeSprites();

//     score = 0;
//     isGameOver = false;
//     console.log("weird");
//   }
// }
