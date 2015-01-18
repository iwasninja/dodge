'use strict';

function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.asset);

    // Background color
    this.stage.backgroundColor = '#87ceeb';

    // Preload assets
    this.load.spritesheet('dude', 'assets/square2.png', 40, 40);
    this.load.image('pipe', 'assets/pipe.png');
    this.load.image('floor', 'assets/floor.png');
    this.load.image('star', 'assets/shur2.png');
    this.load.image('bricks', 'assets/bricks.jpg');
    this.load.image('porthole', 'assets/porthole.png');

    this.load.image('startButton', 'assets/start-button.png');
    this.load.image('bSpacebarsButton', 'assets/bspacebar.png');

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
