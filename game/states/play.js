
  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      // Use the Arcade physics system
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.gravity.y = 500;

      // Add background sprite (don't have one yet. Just color)
      // this.background = this.game.add.sprite(0, 0, 'background');
      
    },
    update: function() {

    },
      
  };
  
  module.exports = Play;