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
        <div class="timer">00:00</div>
        <div class="score">0</div>
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
    scoreText.textContent = '점';
    score.textContent = this.props.score;
    score.append(scoreText);
    timer.textContent = `${(Math.floor(this.props.time / 60) + '').padStart(2, 0)}:${(
      (this.props.time % 60) +
      ''
    ).padStart(2, 0)}`;
  }
}
