
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },

  create: function() {
    // Add background sprite (don't have one yet. Just color
    // loaed on preload.js)
    this.background = this.game.add.tileSprite(0, 0, 480, 320, 'bricks');

    // Create wall group for pipe, floor and round
    this.wallGroup = this.game.add.group();

    // Add ground and pipe tileSprites
    this.pipe = this.game.add.tileSprite(0, 0, 480, 52, 'pipe');
    this.wallGroup.add(this.pipe);
    this.floor = this.game.add.tileSprite(0, this.game.height - 50, 480, 112, 'floor');
    this.wallGroup.add(this.floor);


    // Scroll the walls
    this.pipe.autoScroll(-100,0);
    this.floor.autoScroll(-100, 0);
    this.background.autoScroll(-100,0);

    // Create title group to manipulate
    // title assets as one
    this.titleGroup = this.game.add.group();

    // Add dude to title group
    this.dude = this.game.add.sprite(0, 0, 'dude');
    this.titleGroup.add(this.dude);

    // Set location of the group
    this.titleGroup.x = 30;
    this.titleGroup.y = 100;

    // Animation tween to the titleGroup
    this.game.add.tween(this.titleGroup).to({y:140}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    // Add start button with a callabck
    this.startButton = this.game.add.button(this.game.width/2, this.game.height/2, 'startButton', this.startClick, this);
    this.startButton.anchor.setTo(0.5, 0.5);

  },

  startClick: function() {
    // Start button click handler
    // Start the 'play' state
    this.game.state.start('play');
  },

  update: function() {

  }
};

module.exports = Menu;
