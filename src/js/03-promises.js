import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDelay = document.querySelector('input[name="delay"]'),
  inputStep = document.querySelector('input[name="step"]'),
  inputAmount = document.querySelector('input[name="amount"]'),
  button = document.querySelector('button');

button.addEventListener('click', startScript);
function startScript(event) {
  event.preventDefault();
  let delay = Number(inputDelay.value),
    step = Number(inputStep.value),
    amount = Number(inputAmount.value);

  if (delay > 0 && step > 0 && amount >= 0) {
    for (let i = 0; i < amount; i += 1) {
      let position = i + 1;
      setTimeout(
        currentDelay => {
          function createPromise(position, currentDelay) {
            return new Promise((resolve, reject) => {
              const shouldResolve = Math.random() > 0.3;
              if (shouldResolve) {
                resolve({ position, currentDelay });
              } else {
                reject({ position, currentDelay });
              }
            });
          }

          createPromise(position, currentDelay)
            .then(({ position, currentDelay }) => {
              Notify.success(
                `✅ Fulfilled promise ${position} in ${currentDelay}ms`
              );
            })
            .catch(({ position, currentDelay }) => {
              Notify.failure(
                `❌ Rejected promise ${position} in ${currentDelay}ms`
              );
            });
        },
        delay,
        delay
      );
      delay += step;
    }
  } else {
    Notify.failure('Please enter positive values');
  }
}
