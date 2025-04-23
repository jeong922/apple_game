import { formatTime } from './utils/formatTime.js';

export default class GameDashboard {
  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.render();
    this.setEvent();
  }

  template() {
    return `
      <section class="dashboard">
        <div class="timer-wrapper">
          <span class="name">남은 시간</span>
          <span class="timer">00:00</span>
        </div>
        <div class="score-wrapper">
          <span class="name">점수</span>
          <span class="score">0</span>
        </div>
      </section>
    `;
  }

  render() {
    this.target.innerHTML = this.template();
  }

  setEvent() {
    const score = this.target.querySelector('.score');
    const timer = this.target.querySelector('.timer');
    score.textContent = this.props.score;
    timer.textContent = formatTime(this.props.time);
  }
}
