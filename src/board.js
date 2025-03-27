// 게임보드 구현

// 드래그로 숫자 선택
// -> 대각선으로 선택 안되고 오직 시작 지점으로 부터 오른쪽 왼쪽 위 아래 중 한방향으로만
// -> 시작 지점의 좌표와 움직인 방향을 저장해서 좌표값 확인?
// -> 보드 밖으로 나가면 이벤트 취소
// 선택된 숫자의 수와 선택된 숫자들의 합이 10인지 확인
// 선택된 숫자의 합이 10이면 숫자 삭제
// 선택된 숫자의 합이 10이 아니면 이벤트 취소
export default class Board {
  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.render();
    this.state = {
      isDragging: false,
      startCol: null,
      startRow: null,
      selected: new Set(),
      direction: null,
    };
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
                  `<span class="cell" data-row="${rowIndex}" data-col="${colIndex}">
                    ${num === 0 ? '0' : num}
                  </span>`
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
    const cells = this.target.querySelectorAll('.cell');

    cells.forEach((cell) => {
      cell.addEventListener('mousedown', (e) => {
        this.state.isDragging = true;
        const cur = e.target;
        const row = Number(cur.dataset.row);
        const col = Number(cur.dataset.col);
        this.state.startCol = col;
        this.state.startRow = row;
        const key = `${row}-${col}`;
        this.state.selected.add(key);
      });

      cell.addEventListener('mousemove', (e) => {
        if (!this.state.isDragging) {
          return;
        }

        const cur = e.target;
        const row = Number(cur.dataset.row);
        const col = Number(cur.dataset.col);

        const dx = col - this.state.startCol;
        const dy = row - this.state.startRow;

        this.checkDirection(dx, dy);

        if (
          (this.state.direction === 'right' && dy === 0 && dx > 0) ||
          (this.state.direction === 'left' && dy === 0 && dx < 0) ||
          (this.state.direction === 'down' && dx === 0 && dy > 0) ||
          (this.state.direction === 'up' && dx === 0 && dy < 0)
        ) {
          const key = `${row}-${col}`;
          this.state.selected.add(key);
        }
      });

      cell.addEventListener('mouseup', () => {
        const arr = [...this.state.selected].map((v) => v.split('-'));

        const sum = arr.reduce((acc, [rowStr, colStr]) => {
          const row = Number(rowStr);
          const col = Number(colStr);
          const value = this.props.numbers[row]?.[col] || 0;
          return acc + value;
        }, 0);

        if (sum === 10) {
          arr.forEach(([a, b]) => {
            this.props.updateBoard(Number(a), Number(b));
          });
          this.render();
        }

        this.state.isDragging = false;
        this.state.startRow = null;
        this.state.startCol = null;
        this.state.direction = null;
        this.state.selected = new Set();
      });
    });
  }

  checkDirection = (dx, dy) => {
    if (!this.state.direction) {
      if (dx > 0) {
        this.state.direction = 'right';
      } else if (dx < 0) {
        this.state.direction = 'left';
      } else if (dy > 0) {
        this.state.direction = 'down';
      } else if (dy < 0) {
        this.state.direction = 'up';
      }
    }
  };
}
