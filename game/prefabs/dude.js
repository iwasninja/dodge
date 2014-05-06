'use strict';

var Dude = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'dude', frame);

  // initialize your prefab here
  
};

Dude.prototype = Object.create(Phaser.Sprite.prototype);
Dude.prototype.constructor = Dude;

Dude.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Dude;
