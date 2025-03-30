export default class Board {
  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.state = {
      isDragging: false,
      startCol: null,
      startRow: null,
      endCol: null,
      endRow: null,
      selected: new Set(),
    };
    this.render();
    this.setEvent();
  }

  template() {
    const numbers = this.props.numbers;
    return `
    <section class="board">
      ${numbers
        .map(
          (row, rowIndex) =>
            `<div class="row">${row
              .map(
                (num, colIndex) =>
                  `<div class="cell" data-row="${rowIndex}" data-col="${colIndex}">
                    ${num === 0 ? '' : num}
                  </div>`
              )
              .join('')}</div>`
        )
        .join('')}
    </section>
  `;
  }

  render() {
    this.target.innerHTML = this.template();
    this.setEvent();
  }

  setEvent() {
    document.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown = (e) => {
    if (!e.target.classList.contains('cell')) {
      return;
    }

    this.state.isDragging = true;
    const cur = e.target;
    const row = Number(cur.dataset.row);
    const col = Number(cur.dataset.col);
    this.state.startCol = col;
    this.state.startRow = row;
    this.state.endCol = col;
    this.state.endRow = row;
    this.selectCells();
  };

  handleMouseMove = (e) => {
    if (!this.state.isDragging) {
      return;
    }

    if (!e.target.classList.contains('cell')) {
      return;
    }

    const cur = e.target;
    this.state.endRow = Number(cur.dataset.row);
    this.state.endCol = Number(cur.dataset.col);
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
      const score = filtered.length;
      filtered.forEach(([row, col]) => {
        this.props.updateBoard(+row, +col);
      });

      this.props.updateScore(score);
      this.render();
    }

    this.resetSelection();
    this.resetState();
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

    document.querySelectorAll('.cell').forEach((cell) => {
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
    this.state.isDragging = false;
    this.state.startRow = null;
    this.state.startCol = null;
    this.state.direction = null;
    this.state.selected.clear();
  }
}
