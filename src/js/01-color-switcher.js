function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const buttons = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

let idInterval;

buttons.start.addEventListener('click', startButton);
function startButton() {
  idInterval = setInterval(() => {
    buttons.start.disabled = true;
    const body = document.querySelector('body');
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

buttons.stop.addEventListener('click', stopButton);
function stopButton() {
  clearInterval(idInterval);
  buttons.start.disabled = false;
}