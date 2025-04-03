'use strict';

import Board from './board.js';
import Dashboard from './dashboard.js';
import GameResult from './gameResult.js';
import StartButton from './start.js';
import { hasSumPathToTen } from './utils/boardUtils.js';

const TIME = 120;
class App {
  constructor(target) {
    this.target = target;
    this.state = this.init();
    this.render();
  }

  init() {
    return {
      isStart: false,
      numbers: [],
      score: 0,
      time: TIME,
      interval: null,
    };
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

  mounted() {
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
        updateGame: this.updateGame,
        onReset: this.onReset,
      });
    }
  }

  render() {
    this.target.innerHTML = this.template();
    this.mounted();
  }

  onStart = () => {
    this.state.isStart = true;
    this.state.numbers = this.generateNumbers();
    this.startTimer();
    this.render();
  };

  onReset = () => {
    clearInterval(this.state.interval);
    this.state = this.init();
    this.render();
    const resultContainer = document.querySelector('.result-container');
    resultContainer.classList.remove('visible');
  };

  generateNumbers = () => {
    return Array.from({ length: 5 }, () =>
      Array.from({ length: 5 }, () => {
        const rand = Math.random();
        return rand < 0.7 ? Math.floor(Math.random() * 4) + 1 : Math.floor(Math.random() * 5) + 5;
      })
    );
  };

  updateGame = (arr) => {
    const newNumbers = this.state.numbers.map((rowArr) => [...rowArr]);
    let totalScore = 0;

    arr.forEach(([row, col]) => {
      if (newNumbers[+row][+col] > 0) {
        newNumbers[+row][+col] = 0;
        totalScore++;
      }
    });

    if (this.state.score + totalScore !== this.state.score) {
      this.setState({
        numbers: newNumbers,
        score: this.state.score + totalScore,
      });
    }

    if (!hasSumPathToTen(newNumbers)) {
      setTimeout(() => {
        this.setState({ numbers: this.generateNumbers() });
      }, 100);
    }
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

  renderTime = () => {
    const timer = document.querySelector('.timer');
    timer.textContent = this.updateTimer(this.state.time);
  };

  startTimer = () => {
    clearInterval(this.state.interval);
    this.state.interval = setInterval(() => {
      if (this.state.time > 0) {
        this.state.time -= 1;
        this.renderTime();
      } else {
        clearInterval(this.state.interval);
        this.gameOver();
      }
    }, 1000);
  };

  updateTimer(time) {
    const min = (Math.floor(time / 60) + '').padStart(2, 0);
    const sec = ((time % 60) + '').padStart(2, 0);
    return `${min}:${sec}`;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}

new App(document.querySelector('.app'));
