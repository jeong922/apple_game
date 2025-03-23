class App {
  constructor() {
    const app = document.querySelector(".app");
    const title = document.createElement("h1");
    title.textContent = "사과 게임";
    app.appendChild(title);
  }
}

new App();
