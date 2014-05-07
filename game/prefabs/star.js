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
  
};

module.exports = Star;
