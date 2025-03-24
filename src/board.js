// 게임보드 구현
export default class Board {
  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.render();
  }

  template() {
    return `
      <section class="board">게임 보드 자리</section>
		`;
  }

  render() {
    this.target.innerHTML = this.template();
  }
}
