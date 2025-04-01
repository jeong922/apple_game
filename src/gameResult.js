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
        <div>
          <span>점수</span>
          <span class="result_score">0</span>
					<button class="restart">다시하기</button>
        </div>
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
      this.props.onReset(); // 게임 리셋
      result.remove();
    });
  }

  updateGameResult() {
    const score = this.target.querySelector('.result_score');
    score.textContent = this.props.score;
  }
}
