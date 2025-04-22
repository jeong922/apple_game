export default class GameStart {
  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.render();
  }

  template() {
    return `
			<div class="game-info">
        <span>1️⃣ 드래그하여 숫자를 선택합니다.</span>
        <span>2️⃣ 선택한 숫자의 합이 10이 되면 숫자가 제거 됩니다.</span>
        <span>3️⃣ 선택한 숫자당 1점씩 계산 됩니다.</span>
        <span>4️⃣ 10이 되는 경우의 수가 없다면 새로운 보드를 생성합니다.</span>
        <span>4️⃣ 제한 시간은 2분이며 최대한 많은 점수를 획득하세요.</span>
        <button type="button" class="start__button">게임시작</button>
      </div>
		`;
  }

  render() {
    this.target.innerHTML = this.template();
    this.setEvent();
  }

  setEvent() {
    const button = this.target.querySelector('.start__button');
    button.addEventListener('click', this.handleStartButtonClick);
  }

  handleStartButtonClick = () => {
    const info = this.target.querySelector('.game-info');
    if (this.props.onStart) {
      this.props.onStart();
      info.remove();
    }
  };
}
