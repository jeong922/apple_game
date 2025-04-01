'use strict';

import Board from './board.js';
import Dashboard from './dashboard.js';
import GameResult from './gameResult.js';
import StartButton from './start.js';

// TODO:
// 드래그 할때 버그 수정 필요(가끔 숫자 선택시 올바르게 동작하지 않음)

const TIME = 120;
class App {
  constructor() {
    this.state = {
      isStart: false,
      numbers: [],
      score: 0,
      time: TIME,
    };
    this.interval = null;
    const app = document.querySelector('.app');
    app.innerHTML = this.template();
    this.render();
  }

  template() {
    return `
      <h1 class="title">사과 게임</h1>
      <main class="game">
        <section class="start-container"></section>
        <section class="dashboard-container"></section>
        <section class="board-container"></section>
        <section class="result-container"></section>
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
      new Dashboard(dashboardContainer, { score: this.state.score, time: this.state.time });
      new Board(boardContainer, {
        numbers: this.state.numbers,
        updateBoard: this.updateBoard,
        updateScore: this.updateScore,
        onReset: this.onReset,
      });
    }
  }

  onStart = () => {
    console.log('게임 시작!');
    this.state.isStart = true;
    this.state.numbers = this.generateNumbers();
    this.startTimer();
    this.render();
  };

  onReset = () => {
    console.log('게임 리셋!');
    this.state = {
      isStart: false,
      numbers: [],
      score: 0,
      time: TIME,
    };

    clearInterval(this.interval);
    this.interval = null;
    this.render();

    const resultContainer = document.querySelector('.result-container');
    resultContainer.classList.remove('visible');
  };

  generateNumbers = () => {
    return Array.from({ length: 10 }, () =>
      Array.from({ length: 17 }, () => {
        const rand = Math.random();
        return rand < 0.7 ? Math.floor(Math.random() * 4) + 1 : Math.floor(Math.random() * 5) + 5;
      })
    );
  };

  updateBoard = (row, col) => {
    console.log('보드 업데이트:', row, col);
    this.state.numbers[row][col] = 0;
    this.render();
  };

  updateScore = (n) => {
    console.log('점수 업데이트:', n);
    this.state.score += n;
    this.render();
  };

  gameOver() {
    const resultContainer = document.querySelector('.result-container');
    const gameResult = new GameResult(resultContainer, {
      score: this.state.score,
      onReset: this.onReset,
      onStart: this.onStart,
    });

    gameResult.updateGameResult(this.state.score);
    this.state.isStart = false;
    resultContainer.classList.add('visible');
  }

  startTimer = () => {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (this.state.time > 0) {
        this.state.time -= 1;
        this.render();
      } else {
        clearInterval(this.interval);
        this.gameOver();
      }
    }, 1000);
  };
}

new App();
