import GameStart from '../gameStart.js';

describe('GameStart 컴포넌트', () => {
  let target;

  beforeEach(() => {
    target = document.createElement('div');
    document.body.appendChild(target);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('template()은 올바른 안내 문구를 포함한다.', () => {
    const gameStart = new GameStart(target, {});
    const html = gameStart.template();

    expect(html).toContain('드래그하여 숫자를 선택합니다');
    expect(html).toContain('제한 시간은 2분이며 최대한 많은 점수를 획득하세요');
    expect(html).toContain('게임시작');
  });

  test('렌더링 시 템플릿이 DOM에 추가된다.', () => {
    new GameStart(target, {});
    expect(target.innerHTML).toContain('게임시작');
    expect(target.querySelector('.start__button')).not.toBeNull();
  });

  test('게임 시작 버튼 클릭 시 onStart 콜백이 호출된다.', () => {
    const onStartMock = jest.fn();
    new GameStart(target, { onStart: onStartMock });

    const button = target.querySelector('.start__button');
    button.click();

    expect(onStartMock).toHaveBeenCalledTimes(1);
  });

  test('게임 시작 버튼 클릭 시 컴포넌트가 제거된다.', () => {
    new GameStart(target, {});

    const button = target.querySelector('.start__button');
    button.click();

    expect(document.body.contains(target)).toBe(false);
  });

  test('onStart 콜백이 없어도 에러 없이 동작한다.', () => {
    new GameStart(target, {});
    const button = target.querySelector('.start__button');
    expect(() => button.click()).not.toThrow();
  });

  test('start__button 이외의 영역 클릭 시 onStart는 호출되지 않는다.', () => {
    const onStartMock = jest.fn();
    new GameStart(target, { onStart: onStartMock });

    target.click();
    expect(onStartMock).not.toHaveBeenCalled();
  });
});
