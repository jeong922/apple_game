import { hasSumPathToTen } from '../utils/boardUtils.js';

describe('hasSumPathToTen 함수 테스트', () => {
  test('빈 보드일 경우 항상 false', () => {
    expect(hasSumPathToTen([[]])).toBe(false);
  });

  test('하나의 칸이 10일 경우 true', () => {
    expect(hasSumPathToTen([[10]])).toBe(true);
  });

  test('한 행에서 연속된 숫자의 합이 10이 되는 경우', () => {
    expect(hasSumPathToTen([[5, 5]])).toBe(true);
    expect(hasSumPathToTen([[3, 7]])).toBe(true);
    expect(hasSumPathToTen([[6, 5]])).toBe(false);
  });

  test('여러 행 중 특정 구간의 합이 10이 되는 경우', () => {
    const board = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 1, 2],
    ];
    expect(hasSumPathToTen(board)).toBe(true);
  });

  test('모든 값이 음수 또는 0일 경우 false', () => {
    const board = [
      [0, -1, -2],
      [-3, 0, -4],
    ];
    expect(hasSumPathToTen(board)).toBe(false);
  });

  test('큰 보드에서 연속된 1이 10개 있으면 true', () => {
    const size = 20;
    const board = Array.from({ length: size }, () => Array.from({ length: size }, () => 1));
    expect(hasSumPathToTen(board)).toBe(true);
  });

  test('대각선 합이 10인 경우 true', () => {
    const board = [
      [1, 2, 3],
      [4, 5, 0],
      [5, 0, 5],
    ];
    expect(hasSumPathToTen(board)).toBe(true);
  });
});
