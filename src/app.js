'use strict';

import Game from './game.js';

class App {
  constructor(target) {
    this.target = target;
    this.render();
  }

  template() {
    return `<div class="game-container"></div>`;
  }

  mounted() {
    new Game(this.target);
  }

  render() {
    this.target.innerHTML = this.template();
    this.mounted();
  }
}
new App(document.querySelector('.app'));
