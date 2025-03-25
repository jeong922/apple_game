'use strict';

import Board from './board.js';
import Dashboard from './dashboard.js';
import StartButton from './start.js';

// TODO:
// [ ] 시작 버튼 만들기
// [ ] 시작 버튼을 누르면 타이머 동작하게 만들기기
// [ ] 170점이 되거나 남은 시간이 0이 되면 최종 점수 출력
class App {
  constructor() {
    this.state = {
      isStart: false,
      numbers: [],
    };

    const app = document.querySelector('.app');
    app.innerHTML = this.template();
    this.render();
  }

  template() {
    return `
      <main class="game">
        <h1 class="title">사과 게임</h1>
        <section class="start-container"></section>
        <section class="dashboard-container"></section>
        <section class="board-container"></section>
      </main>
    `;
  }

  render() {
    const startContainer = document.querySelector('.start-container');
    const dashboardContainer = document.querySelector('.dashboard-container');
    const boardContainer = document.querySelector('.board-container');

    if (!this.state.isStart) {
      new StartButton(startContainer, { onStart: this.onStart });
      const dashboard = dashboardContainer.querySelector('.dashboard');
      const board = boardContainer.querySelector('.board');
      if (dashboard) {
        dashboard.remove();
      }

      if (board) {
        board.remove();
      }
    } else {
      new Dashboard(dashboardContainer, { onReset: this.onReset });
      new Board(boardContainer, { numbers: this.state.numbers });
    }
  }

  onStart = () => {
    console.log('게임 시작!');
    this.state.isStart = true;
    this.state.numbers = this.generateNumbers();
    this.render();
  };

  onReset = () => {
    console.log('게임 리셋!');
    this.state.isStart = false;
    this.state.numbers = [];
    this.render();
  };

  generateNumbers = () => {
    return Array.from({ length: 10 }, () => Array.from({ length: 17 }, () => Math.floor(Math.random() * 9) + 1));
  };
}

new App();
