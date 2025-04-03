export const hasSumPathToTen = (board) => {
  const rows = board.length;
  const cols = board[0].length;
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const bfs = (startRow, startCol) => {
    const queue = [[startRow, startCol, board[startRow][startCol], new Set([`${startRow}-${startCol}`])]];

    while (queue.length > 0) {
      const [row, col, sum, visited] = queue.shift();

      if (sum === 10) {
        return true;
      }

      for (let i = 0; i < 4; i++) {
        const newRow = row + dx[i];
        const newCol = col + dy[i];
        const key = `${newRow}-${newCol}`;

        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          board[newRow][newCol] > 0 &&
          !visited.has(key)
        ) {
          queue.push([newRow, newCol, sum + board[newRow][newCol], new Set([...visited, key])]);
        }
      }
    }

    return false;
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] > 0) {
        if (bfs(r, c)) {
          return true;
        }
      }
    }
  }

  return false;
};
