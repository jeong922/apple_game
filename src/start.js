export default class StartButton {
  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.render();
  }

  template() {
    return `
			<button type="button" class="start__button">start</button>
		`;
  }

  render() {
    this.target.innerHTML = this.template();
    this.setEvent();
  }

  setEvent() {
    const button = this.target.querySelector('.start__button');
    button.addEventListener('click', () => {
      if (this.props.onStart) {
        this.props.onStart();
        button.style.visibility = 'hidden';
      }
    });
  }
}
