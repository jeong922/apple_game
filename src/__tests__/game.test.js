import Game from '../game.js';

jest.useFakeTimers();

describe('Game 클래스', () => {
  let target;
  let game;

  beforeEach(() => {
    target = document.createElement('div');
    document.body.appendChild(target);
    game = new Game(target);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllTimers();
  });

  test('초기 렌더링 시 StartButton만 보인다.', () => {
    expect(target.querySelector('.start__button')).not.toBeNull();
    expect(target.querySelector('.dashboard')).toBeNull();
    expect(target.querySelector('.board')).toBeNull();
  });

  test('onStart 실행 시 게임이 시작되고, 보드/대시보드가 렌더링된다.', () => {
    game.onStart();

    expect(game.state.isStart).toBe(true);
    expect(game.state.numbers.length).toBe(10);
    expect(target.querySelector('.dashboard')).not.toBeNull();
    expect(target.querySelector('.board')).not.toBeNull();
  });

  test('onReset 실행 시 상태가 초기화된다.', () => {
    game.onStart();
    game.onReset();

    expect(game.state.isStart).toBe(false);
    expect(game.state.score).toBe(0);
    expect(game.state.time).toBe(Game.TIME);
    expect(target.querySelector('.start__button')).not.toBeNull();
  });

  test('updateGame 호출 시 점수가 올라간다.', () => {
    game.onStart();

    const prevScore = game.state.score;
    game.updateGame([[1, 9]]);

    expect(game.state.score).toBeGreaterThan(prevScore);
  });

  test('타이머가 감소하다가 0이 되면 gameOver가 호출된다.', () => {
    game.onStart();

    // runOnlyPendingTimers: 지금 시점에 대기 중인 타이머만 실행
    jest.advanceTimersByTime((Game.TIME - 1) * 1000);
    expect(game.state.time).toBe(1);

    jest.advanceTimersByTime(1000);

    jest.runOnlyPendingTimers();

    expect(game.state.time).toBe(0);
    expect(target.querySelector('.result-container').classList.contains('visible')).toBe(true);
  });

  test('gameOver 실행 시 결과 화면이 표시된다.', () => {
    game.onStart();
    game.gameOver();

    expect(target.querySelector('.result-container').classList.contains('visible')).toBe(true);
  });

  test('renderTime이 시간을 포맷해서 표시한다.', () => {
    game.onStart();
    game.state.time = 120;
    game.renderTime();

    const timerEl = document.querySelector('.timer');
    expect(timerEl.textContent).toBe('02:00');
  });
});
