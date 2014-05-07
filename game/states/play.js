  'use strict';

  var Dude = require('../prefabs/dude');
  var Wall = require('../prefabs/wall');

  function Play() {}
  Play.prototype = {
    create: function() {
      // Use the Arcade physics system
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.gravity.y = 500;

      // Add background sprite (don't have one yet. Just color 
      // loaded on preolad.js)
      // this.background = this.game.add.sprite(0, 0, 'background');

      // Create new dude object
      this.dude = new Dude(this.game, 30, this.game.height / 2)
      // Add the new dude object to the game
      this.game.add.existing(this.dude)

      // Create and add wall objects to the game
      this.ground = new Wall(this.game, 0, this.game.height - 30, 480, 112);
      this.ceiling = new Wall(this.game, 0, 0, 480, 30);
      this.game.add.existing(this.ground);
      this.game.add.existing(this.ceiling);
      
    },
    update: function() {
      this.game.physics.arcade.collide(this.dude, this.ground);
      this.game.physics.arcade.collide(this.dude, this.ceiling);
    },
      
  };
  
  module.exports = Play;