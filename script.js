
const field = document.getElementById("field");
const target = document.getElementById("target");
const startButton = document.getElementById("start");

const scoreText = document.getElementById("score");
const recordText = document.getElementById("record");
const playerText = document.getElementById("player");

let score = 0;
let record = Number(localStorage.getItem("record")) || 0;
let playing = false;

recordText.textContent = record;

// Подключаемся к Telegram, если приложение
// открыто внутри мессенджера.
const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();

  const user = tg.initDataUnsafe?.user;

  if (user) {
    playerText.textContent =
      "Привет, " + user.first_name + "!";
  }
}

// Перемещение квадрата
function moveTarget() {
  const maxX = field.clientWidth - target.offsetWidth;
  const maxY = field.clientHeight - target.offsetHeight;

  const x = Math.random() * Math.max(0, maxX);
  const y = Math.random() * Math.max(0, maxY);

  target.style.left = x + "px";
  target.style.top = y + "px";
}

// Начало игры
function startGame() {
  score = 0;
  playing = true;

  scoreText.textContent = score;
  target.style.display = "block";
  startButton.textContent = "Начать заново";

  moveTarget();
}

// Игрок нажал на квадрат
function catchTarget() {
  if (!playing) return;

  score++;
  scoreText.textContent = score;

  if (score > record) {
    record = score;
    recordText.textContent = record;
    localStorage.setItem("record", record);
  }

  // Вибрация на телефоне, если поддерживается
  tg?.HapticFeedback?.impactOccurred("light");

  moveTarget();
}

// Обработчики событий
startButton.addEventListener("click", startGame);
target.addEventListener("click", catchTarget);
