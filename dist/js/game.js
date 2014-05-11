(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Modify this file from templates/_main.js.tpl

'use strict';

//global variables
// Set score as global variable, so it can
// be accessed by all game states.
// Access it as window.score
var score = 0;

window.onload = function () {
  var game = new Phaser.Game(480, 320, Phaser.AUTO, 'dodgedude');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":6,"./states/gameover":7,"./states/menu":8,"./states/play":9,"./states/preload":10}],2:[function(require,module,exports){
'use strict';

var Decoration = function(game, x, y, asset, frame, velocity) {
  Phaser.Sprite.call(this, game, x, y, asset, frame);

  // Set decoration object's anchor point
  this.anchor.setTo(0.5, 0.5);
  // Enable physics on decoration's body
  this.game.physics.arcade.enableBody(this);
  // Disable gravity and make them immovable
  this.body.allowGravity = false;

  // Set decoration object's velocity
  this.body.velocity.x = velocity;

  // Check if the decoration object go
  // out of bounds, and kill it if it does
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  
};

Decoration.prototype = Object.create(Phaser.Sprite.prototype);
Decoration.prototype.constructor = Decoration;

Decoration.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Decoration;

},{}],3:[function(require,module,exports){
'use strict';

var Dude = function(game, x, y, frame) {
	// Super call to Phaser.Sprite
	Phaser.Sprite.call(this, game, x, y, 'dude', frame);

	// Set the sprite's anchor point
	this.anchor.setTo(0.5, 0.5);

	// Add physics body to sprite
	this.game.physics.arcade.enableBody(this);
  
};

Dude.prototype = Object.create(Phaser.Sprite.prototype);
Dude.prototype.constructor = Dude;

Dude.prototype.update = function() {
  
	// write your prefab's specific update code here
  
};

Dude.prototype.move = function() {
	// Reverse gravity so the dude will move
	// from one wall to other
	this.game.physics.arcade.gravity.y = -this.game.physics.arcade.gravity.y;
}

module.exports = Dude;

},{}],4:[function(require,module,exports){
'use strict';

var Star = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'star', frame);

  // Set anchor and enable physics on star objects
  this.anchor.setTo(0.5, 0.5);
  this.game.physics.arcade.enableBody(this);

  // Disable gravity and make them immovable
  this.body.allowGravity = false;
  this.body.immovable = true;

  // Give velocity to star objects
  this.body.velocity.x = -150;

  // Set avoided attribute for stars
  this.avoided = false;

  // Check if the star go out of bounds,
  // and kill it if it does
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  
};

Star.prototype = Object.create(Phaser.Sprite.prototype);
Star.prototype.constructor = Star;

Star.prototype.update = function() {
  
  // write your prefab's specific update code here
  // Change the sprite's angle each second
  // (60 times per minute) (rotated star effect)
  this.angle += -2;
  
};

module.exports = Star;

},{}],5:[function(require,module,exports){
'use strict';

var Wall = function(game, x, y, width, height, asset) {
  Phaser.TileSprite.call(this, game, x, y, width, height, asset);

  // Enable physics on the wall sprite
  // (for collision detection)
  this.game.physics.arcade.enableBody(this);

  // Add autosrcoll to walls
  this.autoScroll(-100, 0);

  // Make wall objects unaffected by gravity
  this.body.allowGravity = false;

  // Make wall objects unaffected by collisions
  this.body.immovable = true;
  
};

Wall.prototype = Object.create(Phaser.TileSprite.prototype);
Wall.prototype.constructor = Wall;

Wall.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Wall;

},{}],6:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],7:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    // Declare variables
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    var bestScore;

    // Check if localStorage option is available
    if (localStorage) {
      // Check localStorage for a bestScore value
      bestScore = localStorage.getItem('bestScore');

      // Update bestScore
      if (!bestScore || bestScore < window.score) {
        bestScore = window.score;
        localStorage.setItem('bestScore', bestScore);
      }
    } else {
      // Fallback in case localStorage is not available
      bestScore = "N/A";
    }

    this.titleText = this.game.add.text(this.game.world.centerX,70, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    // Display last game's score
    this.congratsText = this.game.add.text(this.game.world.centerX, 150, 'Score: ' + window.score.toString(), { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    // Display best score
    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'Best score: ' + bestScore.toString(), { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 280, 'Click/Tap To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],8:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },

  create: function() {
    // Add background sprite
    this.background = this.game.add.tileSprite(0, 0, 480, 320, 'bricks');

    // Create wall group for pipe and floor
    this.wallGroup = this.game.add.group();

    // Add ground and pipe tileSprites
    this.pipe = this.game.add.tileSprite(0, 0, 480, 52, 'pipe');
    this.wallGroup.add(this.pipe);
    this.floor = this.game.add.tileSprite(0, this.game.height - 50, 480, 112, 'floor');
    this.wallGroup.add(this.floor);


    // Scroll the walls
    this.pipe.autoScroll(-100,0);
    this.floor.autoScroll(-100, 0);
    this.background.autoScroll(-100,0);

    // Create title group to manipulate
    // title assets as one
    this.titleGroup = this.game.add.group();

    // Add dude to title group
    this.dude = this.game.add.sprite(0, 0, 'dude');
    this.titleGroup.add(this.dude);

    // Set location of the group
    this.titleGroup.x = 30;
    this.titleGroup.y = 100;

    // Animation tween to the titleGroup
    this.game.add.tween(this.titleGroup).to({y:140}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    // Add start button with a callabck
    this.startButton = this.game.add.button(this.game.width/2, this.game.height/2, 'startButton', this.startClick, this);
    this.startButton.anchor.setTo(0.5, 0.5);

  },

  startClick: function() {
    // Start button click handler
    // Start the 'play' state
    this.game.state.start('play');
  },

  update: function() {

  }
};

module.exports = Menu;

},{}],9:[function(require,module,exports){
  'use strict';

  var Dude = require('../prefabs/dude');
  var Wall = require('../prefabs/wall');
  var Star = require('../prefabs/star');
  var Decoration = require('../prefabs/decoration');

  function Play() {}
  Play.prototype = {
    create: function() {
      // Use the Arcade physics system
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.gravity.y = -1000;

      // Add background sprite (as wall object)
      this.background = new Wall(this.game, 0, 0, 480, 320, 'bricks');
      this.game.add.existing(this.background);

      // Create wall objects floor and pipe
      this.floor = new Wall(this.game, 0, this.game.height - 50, 480, 112, 'floor');
      this.pipe = new Wall(this.game, 0, 0, 480, 52, 'pipe');
      // Set body size of the wall objects floor and pipe
      this.floor.body.setSize(480, 31, 0, 19);
      this.pipe.body.setSize(480, 45, 0, 0);
      // Add the wall objects floor and pipe to the game
      this.game.add.existing(this.floor);
      this.game.add.existing(this.pipe);


      // Create and add group to hold stars
      this.stars = this.game.add.group();
      // Create and add group to hold decorations
      this.decorations = this.game.add.group();
      // Add timer for stars
      this.starGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.7, this.generateStar, this);
      this.starGenerator.timer.start();
      // Add timer for portholes
      this.portholeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 7.2, this.generatePorthole, this);
      this.portholeGenerator.timer.start();


      // Create new dude object
      this.dude = new Dude(this.game, 30, this.game.height / 2);
      // Add the new dude object to the game
      this.game.add.existing(this.dude);


      // Keep the spacebar from propogating up to the browser
      this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
      // Add keyboard controls
      var moveKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      moveKey.onDown.add(this.dude.move, this.dude);
      // Add mouse/touch controls
      this.input.onDown.add(this.dude.move, this.dude);


      // Score Keeper
      window.score = 0;
      // Score text
      this.scoreText = this.game.add.text(16, 0, '0', { font: '32px Impact', fill: '#fff' });
      
    },

    update: function() {
      // Enable collisions between dude and walls
      this.game.physics.arcade.collide(this.dude, this.floor);
      this.game.physics.arcade.collide(this.dude, this.pipe);

      // Enable collisions between dude and stars in the stars group
      // and run checkScore for each of them
      this.stars.forEach(function(star){
        this.checkScore(star);
        this.game.physics.arcade.collide(this.dude, star, this.deathHandler, null, this);
      }, this);
    },

    generateStar: function() {
      // Flip coin to choose where the star will appear
      var coin = this.game.rnd.integerInRange(1,2);
      var starPosition;
      console.log("generateStar")
      if (coin == 1) {
        starPosition = 62;
      } else {
        starPosition = 269;
      }

      // Generate and add star
      this.star = new Star(this.game, this.game.width + 10, starPosition, this);
      this.stars.add(this.star);
      // this.game.add.existing(this.star)

    },

    generatePorthole: function() {
      // Generate porthole
      this.porthole = new Decoration(this.game, this.game.width + 30, 130, 'porthole', this, -100);
      // Add generated porthole to decorations group
      this.decorations.add(this.porthole);

    },

    deathHandler: function() {
      this.game.state.start('gameover');
    },

    checkScore: function(star) {
      if (star.exists && !star.avoided && star.world.x <= this.dude.world.x) {
        star.avoided = true;
        window.score++;
        this.scoreText.setText(window.score.toString());
      };
    }
  };
  
  module.exports = Play;
},{"../prefabs/decoration":2,"../prefabs/dude":3,"../prefabs/star":4,"../prefabs/wall":5}],10:[function(require,module,exports){
'use strict';

function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.asset);

    // Background color
    this.stage.backgroundColor = '#87ceeb';

    // Preload assets
    this.load.spritesheet('dude', 'assets/square2.png', 40, 40);
    this.load.image('pipe', 'assets/pipe.png');
    this.load.image('floor', 'assets/floor.png');
    this.load.image('ground', 'assets/floor.png');
    this.load.image('star', 'assets/shur.png');
    this.load.image('bricks', 'assets/bricks.jpg');
    this.load.image('porthole', 'assets/porthole.png');

    this.load.image('startButton', 'assets/start-button.png');

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])