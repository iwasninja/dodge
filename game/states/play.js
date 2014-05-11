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