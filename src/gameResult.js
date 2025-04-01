export default class GameResult {
  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.render();
    this.setEvent();
  }

  template() {
    return `
      <section class="result">
        <div class="score-container">
          <span>최종점수:</span>
          <span class="total-score">0</span>
          <span>점</span>
				</div>
					<button class="restart">다시하기</button>
      </section>
    `;
  }

  render() {
    this.target.innerHTML = this.template();
  }

  setEvent() {
    const button = this.target.querySelector('.restart');
    const result = this.target.querySelector('.result');

    button.addEventListener('click', () => {
      this.props.onReset();
      result.remove();
    });
  }

  updateGameResult() {
    const score = this.target.querySelector('.total-score');
    score.textContent = this.props.score;
  }
}
