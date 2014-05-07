  'use strict';

  var Dude = require('../prefabs/dude');
  var Wall = require('../prefabs/wall');
  var Star = require('../prefabs/star');

  function Play() {}
  Play.prototype = {
    create: function() {
      // Use the Arcade physics system
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.gravity.y = -1000;

      // Add background sprite (don't have one yet. Just color 
      // loaded on preolad.js)
      // this.background = this.game.add.sprite(0, 0, 'background');

      // Create new dude object
      this.dude = new Dude(this.game, 30, this.game.height / 2)
      // Add the new dude object to the game
      this.game.add.existing(this.dude);

      // Create and add group to hold stars
      this.stars = this.game.add.group();

      // Create and add wall objects to the game
      this.ground = new Wall(this.game, 0, this.game.height - 30, 480, 112);
      this.ceiling = new Wall(this.game, 0, 0, 480, 30);
      this.game.add.existing(this.ground);
      this.game.add.existing(this.ceiling);

      // Keep the spacebar from propogating up to the browser
      this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

      // Add keyboard controls
      var moveKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      moveKey.onDown.add(this.dude.move, this.dude);

      // Add mouse/touch controls
      this.input.onDown.add(this.dude.move, this.dude);

      // Add timer for stars
      this.starGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.7, this.generateStar, this);
      this.starGenerator.timer.start();
      
    },

    update: function() {
      // Enable collisions between dude and walls
      this.game.physics.arcade.collide(this.dude, this.ground);
      this.game.physics.arcade.collide(this.dude, this.ceiling);

      // Enable collisions between dude and stars in the stars group
      this.stars.forEach(function(star){
        this.game.physics.arcade.collide(this.dude, star, this.deathHandler, null, this);
      }, this);
    },

    generateStar: function() {
      // Flip coin to choose where the star will appear
      var coin = this.game.rnd.integerInRange(1,2);
      var starPosition;
      console.log("generateStar")
      if (coin == 1) {
        starPosition = 45;
      } else {
        starPosition = 270;
      }

      this.star = new Star(this.game, this.game.width + 10, starPosition, this);
      this.stars.add(this.star);
      // this.game.add.existing(this.star)

    },

    deathHandler: function() {
      this.game.state.start('gameover');
    },
  };
  
  module.exports = Play;