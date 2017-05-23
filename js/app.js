// Enemies our player must avoid
var Enemy = function() {
    "use strict";
    // Variables applied to each of our instances go here,
    this.x = -101;
    this.y = 0;

    this.maxSpeed = 300;
    // maximum speed applicable

    // resolve the enemy's row position
     this.y = (Math.floor(Math.random() * 4) * 83) + 83;

     // resolve speed of an enemy
    this.speed = Math.floor(Math.random() * this.maxSpeed + 1);

    this.playerSlay = 0;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};


// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Check for collision between player and enemies
    if ((Math.abs(this.x - player.x) < 70) && (Math.abs(this.y - player.y) < 15)) {
    player.reset();
    this.playerSlay++;
  }

    // when off canvas, reset position of enemy
    if (this.x > ctx.canvas.width) {
    this.x = -101;
    this.y = (Math.floor(Math.random() * 4) * 83) + 83;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Player Class
var Player = function() {
    "use strict";

    this.x = 404;
    this.y = 404;
    this.sprite = "images/char-cat-girl.png";
    this.score = 0;
    this.lives = 3;
};


Player.prototype.returnToStart = function() {
  this.y = 404;
};

Player.prototype.reset = function() {
  this.lives--;
  this.returnToStart();
};

Player.prototype.hitPoint = function() {
  this.score++;
  this.returnToStart();
  // increase enemy speed
  allEnemies.forEach(function(enemy) {
    enemy.speed += 15;
  });
  if (this.score % 3 === 0) {
    // player gets a new life after every three point
    this.lives++;
    // and a new enemy
    allEnemies.push(new Enemy());
  }
  // update score on screen
};

//Update Function
Player.prototype.update = function(dt) {
  if (this.y < 0) {
    this.hitPoint();
  }
  };

// Player.render()
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

  ctx.font = "26px Arial";
  ctx.fillStyle = "#000";
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#000";
  ctx.fillText("Score: " + this.score, 405, 50);
  ctx.strokeText("Score: " + this.score, 405, 50);
  ctx.fillText("Lives: " + this.lives, 205, 50);
  ctx.strokeText("Lives: " + this.lives, 205, 50);


};
//handleInput function
Player.prototype.handleInput = function(eventKey) {
  var nonGameKey = false;
  switch (eventKey) {
    case "up":
      this.y -= 83;
      // this.hitPoint() will prevent the
      // player from going too far up
      break;
    case "down":
      if (this.y < 404) {
        this.y += 83;
      }
      break;
    case "left":
      if (this.x > 0) {
        this.x -= 101;
      }
      break;
    case "right":
      if (this.x < 808) {
        this.x += 101;
      }
      break;
    default:
      // the user pressed some other key
      nonGameKey = true;
  }
};

// instantiating the objects.
var allEnemies = [new Enemy(), new Enemy(), new Enemy(),
  new Enemy(), new Enemy(), new Enemy()
];

var player = new Player();

document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };
  player.handleInput(allowedKeys[e.keyCode]);
});