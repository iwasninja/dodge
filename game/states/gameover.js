
'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    // Declare variables
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    var bestScore;

    // Check if localStorage option is available
    if (localStorage) {
      // Check localStorage for a bestScore value
      bestScore = localStorage.getItem('bestScore');

      // Update bestScore
      if (!bestScore || bestScore < window.score) {
        bestScore = window.score;
        localStorage.setItem('bestScore', bestScore);
      }
    } else {
      // Fallback in case localStorage is not available
      bestScore = "N/A";
    }

    this.titleText = this.game.add.text(this.game.world.centerX,70, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    // Display last game's score
    this.congratsText = this.game.add.text(this.game.world.centerX, 150, 'Score: ' + window.score.toString(), { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    // Display best score
    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'Best score: ' + bestScore.toString(), { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 280, 'Click/Tap To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;
