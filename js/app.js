/*
App.js
*/

/*
Height and Width for player and enemy are the same so
assign a global variable to use in collision detection.
*/
var imgDim = {w:101, h:171};

// Enemies our player must avoid
var Enemy = function(x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  // Loads the enemy-bug image.
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  // Formula for randomizing speed of enemy.
  this.speed = Math.floor((Math.random()*4)+2);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  //******* alters speed of enemy bugs **********
  this.x = this.x + (105 * dt * this.speed);
  //if enemy bug goes off screen reset it to update.
  if (this.x > 650) {
	    this.reset()
    };
};

//Resets each Enemy and randomizes y position when it goes off screen.
Enemy.prototype.reset = function() {
  //starts the enemy off screen
  this.x = -100;
  var yValues = [65, 145, 230, 310];
  this.y = yValues[Math.floor((Math.random() * 4))];
  this.speed;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, sprite) {
  this.sprite = 'images/char-boy.png';
  startX = 202;
  startY = 404;
  this.x = startX;
  this.y = startY;
};

//Update function handling player position for restart and messages.
Player.prototype.update = function(dt) {
  if (this.y > -83 && this.y < 0) {
    document.getElementById('winner').innerHTML ='Congrats! Press up to start over'
    };
  if (this.y < -83){
    this.x = startX;
    this.y = startY;
    document.getElementById('winner').innerHTML =''
  };
  //Collision detection algorithm.
  allEnemies.forEach(function(enemy) {
    if (player.x < enemy.x + 40 &&
        player.x > enemy.x &&
        player.y < enemy.y + 40 &&
        player.y > enemy.y) {
          player.reset();
          document.getElementById('winner').innerHTML ='Try Again!'
        };
    });
};

//Render player when game loads.
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Handling input for user and limiting to only direction keys.
Player.prototype.handleInput = function(direction) {
  switch (direction) {
    case 'left':
      if (this.x > 0) {
        this.x -= 101;
      }
      break;
    case 'right':
      if (this.x < 404) {
        this.x += 101;
      }
      break;
    case 'up':
      if (this.y > -83) {
        this.y -= 83;
      }
      break;
    case 'down':
      if (this.y < 404) {
        this.y += 83;
      }
      break;
    }
}

//Resets player to bottom of the screen in the grass.
Player.prototype.reset = function() {
  this.x = startX;
  this.y = startY;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
  new Enemy(0),
  new Enemy(0),
  new Enemy(0),
  new Enemy(0),
  new Enemy(0)
];

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
