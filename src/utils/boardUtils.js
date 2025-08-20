export const hasSumPathToTen = (board) => {
  const rows = board.length;
  const cols = board[0].length;

  for (let startRow = 0; startRow < rows; startRow++) {
    for (let startCol = 0; startCol < cols; startCol++) {
      if (board[startRow][startCol] > 0) {
        let rowSum = Array(cols).fill(0);

        for (let endRow = startRow; endRow < rows; endRow++) {
          let sum = 0;

          for (let col = startCol; col < cols; col++) {
            rowSum[col] += board[endRow][col];
            sum += rowSum[col];

            if (sum === 10) {
              return true;
            }
            if (sum > 10) {
              break;
            }
          }
        }
      }
    }
  }

  return false;
};
