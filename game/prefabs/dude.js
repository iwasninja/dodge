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
