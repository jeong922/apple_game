import { formatTime } from '../utils/formatTime.js';

describe('formatTime 함수', () => {
  test('0초는 "00:00"으로 변환된다.', () => {
    expect(formatTime(0)).toBe('00:00');
  });

  test('1분 미만의 값도 올바르게 변환된다.', () => {
    expect(formatTime(5)).toBe('00:05');
    expect(formatTime(59)).toBe('00:59');
  });

  test('분과 초가 올바르게 계산된다.', () => {
    expect(formatTime(60)).toBe('01:00');
    expect(formatTime(65)).toBe('01:05');
  });

  test('앞에 0이 붙는 형식이 유지된다.', () => {
    expect(formatTime(7)).toBe('00:07');
    expect(formatTime(70)).toBe('01:10');
  });

  test('큰 값도 정상적으로 변환된다.', () => {
    expect(formatTime(600)).toBe('10:00');
    expect(formatTime(3600)).toBe('60:00');
  });

  test('잘못된 입력(NaN)은 "NaN:NaN"을 반환한다.', () => {
    expect(formatTime(NaN)).toBe('NaN:NaN');
  });
});
