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
