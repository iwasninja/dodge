// Modify this file from templates/_main.js.tpl

'use strict';

//global variables
// Set score as global variable, so it can
// be accessed by all game states.
// Access it as window.score
var score = 0;

window.onload = function () {
  var game = new Phaser.Game(480, 320, Phaser.AUTO, 'dodgedude');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};