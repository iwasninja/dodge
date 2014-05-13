'use strict';

var Dude = function(game, x, y, frame) {
	// Super call to Phaser.Sprite
	Phaser.Sprite.call(this, game, x, y, 'dude', frame);

	// Set the sprite's anchor point
	this.anchor.setTo(0.5, 0.5);

	// Add physics body to sprite
	this.game.physics.arcade.enableBody(this);
	this.body.setSize(10, 40, 0, 0);
  
};

Dude.prototype = Object.create(Phaser.Sprite.prototype);
Dude.prototype.constructor = Dude;

Dude.prototype.update = function() {
  
	// write your prefab's specific update code here
  
};

Dude.prototype.move = function() {
	// Reverse gravity so the dude will move
	// from one wall to other
	if (this.body.touching.up || this.body.touching.down)
		this.game.physics.arcade.gravity.y *= -1;
}

module.exports = Dude;
