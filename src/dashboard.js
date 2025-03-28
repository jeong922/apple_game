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
        <button type="button" class="reset">reset</button>
      </section>
    `;
  }

  render() {
    this.target.innerHTML = this.template();
  }

  setEvent() {
    const button = this.target.querySelector('.reset');
    const dashboard = this.target.querySelector('.dashboard');
    const score = this.target.querySelector('.score');
    const timer = this.target.querySelector('.timer');
    score.textContent = this.props.score;
    timer.textContent = this.updateTimer(this.props.time);

    this.updateTimer(this.props.time);

    button.addEventListener('click', () => {
      if (this.props.onReset) {
        this.props.onReset();
      }
    });
  }

  updateTimer(time) {
    const min = (Math.floor(time / 60) + '').padStart(2, 0);
    const sec = ((time % 60) + '').padStart(2, 0);
    return `${min}:${sec}`;
  }
}
