export default class GameBoard {
  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.state = this.init();
    this.render();
    this.setEvent();
  }

  init() {
    return {
      isDragging: false,
      startCol: null,
      startRow: null,
      endCol: null,
      endRow: null,
      selected: new Set(),
    };
  }

  template() {
    return `
    <section class="board">
      ${this.props.numbers
        .map(
          (row, rowIndex) =>
            `<div class="row">${row
              .map(
                (num, colIndex) =>
                  `<div class="cell" data-row="${rowIndex}" data-col="${colIndex}">
                    ${
                      num
                        ? `
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M224 112c-8.8 0-16-7.2-16-16V80c0-44.2 35.8-80 80-80h16c8.8 0 16 7.2 16 16v16c0 44.2-35.8 80-80 80h-16z" fill="#B5E48C"/>
                        <path d="M0 288c0-76.3 35.7-160 112-160c27.3 0 59.7 10.3 82.7 19.3c18.8 7.3 39.9 7.3 58.7 0c22.9-8.9 55.4-19.3 82.7-19.3c76.3 0 112 83.7 112 160c0 128-80 224-160 224c-16.5 0-38.1-6.6-51.5-11.3c-8.1-2.8-16.9-2.8-25 0c-13.4 4.7-35 11.3-51.5 11.3C80 512 0 416 0 288z" fill="#FF6B6B"/>
                      </svg>
                    `
                        : ''
                    }
                    <span>${num === 0 ? '' : num}</span>
                  </div>`
              )
              .join('')}</div>`
        )
        .join('')}
      <div>
        <button type="button" class="reset">재시작</button>
      </div>
    </section>
  `;
  }

  render() {
    this.target.innerHTML = this.template();
  }

  setEvent() {
    this.target.addEventListener('mousedown', this.handleMouseDown);
    this.target.addEventListener('mouseup', this.handleMouseUp);
    this.target.addEventListener('click', this.handleResetClick);
  }

  handleResetClick = (e) => {
    if (e.target.closest('.reset')) {
      this.handleGameReset();
    }
  };

  handleMouseDown = (e) => {
    const cell = e.target.closest('.cell');

    if (!cell) {
      return;
    }

    this.state.isDragging = true;
    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);
    this.state.startCol = col;
    this.state.startRow = row;
    this.state.endCol = col;
    this.state.endRow = row;
    this.selectCells();

    this.target.addEventListener('mousemove', this.handleMouseMove);
  };

  handleMouseMove = (e) => {
    if (!this.state.isDragging) {
      return;
    }

    const cell = e.target.closest('.cell');

    if (!cell) {
      return;
    }

    this.state.endRow = Number(cell.dataset.row);
    this.state.endCol = Number(cell.dataset.col);
    this.selectCells();
  };

  handleMouseUp = () => {
    if (!this.state.isDragging) {
      return;
    }

    const arr = [...this.state.selected].map((v) => v.split('-'));
    const filtered = arr.filter(([row, col]) => this.props.numbers[+row][+col] > 0);

    const sum = filtered.reduce((acc, [row, col]) => {
      const value = this.props.numbers[+row][+col];
      return acc + value;
    }, 0);

    if (sum === 10) {
      filtered.forEach(([row, col]) => {
        const cell = this.target.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        if (cell) {
          cell.classList.add('disappear');
        }
      });

      setTimeout(() => {
        this.props.updateGame(filtered);
      }, 400);
    }

    this.resetSelection();
    this.resetState();

    this.target.removeEventListener('mousemove', this.handleMouseMove);
  };

  handleGameReset = () => {
    this.resetState();
    this.props.onReset();
  };

  selectCells() {
    this.state.selected.clear();
    const minRow = Math.min(this.state.startRow, this.state.endRow);
    const maxRow = Math.max(this.state.startRow, this.state.endRow);
    const minCol = Math.min(this.state.startCol, this.state.endCol);
    const maxCol = Math.max(this.state.startCol, this.state.endCol);

    for (let row = minRow; row <= maxRow; row++) {
      for (let col = minCol; col <= maxCol; col++) {
        this.state.selected.add(`${row}-${col}`);
      }
    }

    this.target.querySelectorAll('.cell').forEach((cell) => {
      const row = cell.dataset.row;
      const col = cell.dataset.col;
      if (this.state.selected.has(`${row}-${col}`)) {
        cell.classList.add('selected');
      } else {
        cell.classList.remove('selected');
      }
    });
  }

  resetSelection() {
    this.state.selected.forEach((value) => {
      const [row, col] = value.split('-');
      const cell = this.target.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
      if (cell) {
        cell.classList.remove('selected');
      }
    });
  }

  resetState() {
    this.state = this.init();
  }
}
