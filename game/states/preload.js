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

    // Demo asset
    this.load.image('yeoman', 'assets/yeoman-logo.png');

    // Background color
    this.stage.backgroundColor = '#87ceeb';

    // Preload assets
    this.load.spritesheet('dudeFront', 'assets/square.png', 20, 20);
    this.load.spritesheet('dude', 'assets/square2.png', 40, 40);
    this.load.image('ceiling', 'assets/ceil.png');
    this.load.image('floor', 'assets/floor.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('star', 'assets/shur.png');
    this.load.image('leftbo', 'assets/leftbor.png');

    this.load.image('startButton', 'assets/start-button.png');

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
