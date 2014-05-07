'use strict';

var Wall = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'ground');

  // Enable physics on the wall sprite
  // (for collision detection)
  this.game.physics.arcade.enableBody(this);
  
};

Wall.prototype = Object.create(Phaser.TileSprite.prototype);
Wall.prototype.constructor = Wall;

Wall.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Wall;
