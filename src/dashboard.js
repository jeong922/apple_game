export default class Dashboard {
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
    const scoreText = document.createElement('span');
    // scoreText.textContent = '점';
    score.textContent = this.props.score;
    score.append(scoreText);
    timer.textContent = `${(Math.floor(this.props.time / 60) + '').padStart(2, 0)}:${(
      (this.props.time % 60) +
      ''
    ).padStart(2, 0)}`;
  }
}
