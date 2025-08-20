# 사과게임

### [사과 게임](https://jeong922.github.io/apple_game/)

## 목표

- 바닐라 자바스크립트와 클래스 문법을 사용하여 간단한 사과 게임 만들기

## 기술

<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"> <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-663399?style=for-the-badge&logo=css&logoColor=white"> <img src="https://img.shields.io/badge/babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white"> <img src="https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white"> <img src="https://img.shields.io/badge/githubpages-222222?style=for-the-badge&logo=githubpages&logoColor=white"> <img src="https://img.shields.io/badge/jest-C21325?style=for-the-badge&logo=jest&logoColor=white">

## 설계

⬇️ AI를 이용해 그린 클래스 다이어그램

<p align='center'>
  <img src="./image/dr.png" height="650" />
</p>

## 구현

### 게임 시작

- 게임 시작 전, 게임에 대한 설명 출력
- 게임 시작 버튼을 누르면 `Game.onStart()` 호출하여 게임이 시작되고, 보드 초기화 및, 타이머 시작

### 사과 선택

- `GameBoard`에서 사과를 드래그 하여 선택
- 선택된 사과 합계가 10이면 사과 수 만큼 점수 증가
- 만약, 남은 사과가 10을 만족하는 경우의 수가 없는 경우 새로운 보드 생성
  - `hasSumPathToTen(newNumbers)`로 합이 10인 경로가 있는지 체크하고, 없으면 `generateNumbers()`로 새 보드를 생성
  - `setTimeout`을 이용해 상태 갱신과 이벤트 루프 충돌 방지

```js
// game.js

updateGame = (arr) => {
  // ...

  if (!hasSumPathToTen(newNumbers)) {
    setTimeout(() => {
      this.setState({ numbers: this.generateNumbers() });
    }, 100);
  }
};
```

### 점수 및 시간 갱신

- `GameDashboard`에서 실시간 점수와 남은 시간 표시

### 게임 종료

- 제한 시간이 끝나면 `Game.gameOver()` 호출
- `GameResult.updateGameResult()`를 통해 최종 점수 표시

<p align='center'>
  <img src="./image/game.gif" height="500" />
</p>
