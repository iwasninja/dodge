// Modify this file from templates/_main.js.tpl

'use strict';

//global variables
// Set score as global variable, so it can
// be accessed by all game states.
// Access it as window.score
var score = 0;

window.onload = function () {
  var game = new Phaser.Game(<%= gameWidth %>, <%= gameHeight %>, Phaser.AUTO, '<%= _.slugify(projectName) %>');

  // Game States
  <% _.forEach(gameStates, function(gameState) {  %>game.state.add('<%= gameState.shortName %>', require('./states/<%= gameState.shortName %>'));
  <% }); %>

  game.state.start('boot');
};