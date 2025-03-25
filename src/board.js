// 게임보드 구현
export default class Board {
  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.render();
  }

  template() {
    const numbers = this.props.numbers;
    return `
    <section class="board">
      ${numbers
        .map((row) => `<div class="row">${row.map((num) => `<span class="cell">${num}</span>`).join('')}</div>`)
        .join('')}
    </section>
  `;
  }

  render() {
    this.target.innerHTML = this.template();
  }
}
