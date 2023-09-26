import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputText = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
startButton.disabled = true;

function startFlatpickr() {
  flatpickr(inputText, options);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    console.log(selectedDate);
    if (selectedDate <= options.defaultDate) {
      startButton.disabled = true;
      Notify.failure('Qui timide rogat docet negare');
      //alert('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
  },
};

startFlatpickr();

startButton.addEventListener('click', startTimer);

function startTimer() {
  startButton.disabled = true;
  const date = new Date(selectedDate - options.defaultDate);
  const ms = date.getTime();

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  let { days, hours, minutes, seconds } = convertMs(ms);

  const refs = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  };

  refs.seconds.textContent = seconds;
  refs.minutes.textContent = minutes;
  refs.hours.textContent = hours;
  refs.days.textContent = days;

  const interval = setInterval(() => {
    if (seconds !== 0) {
      refs.seconds.textContent = seconds;
      seconds -= 1;
    } else {
      seconds = 59;
      refs.seconds.textContent = seconds;
      if (minutes !== 0) {
        minutes -= 1;
        refs.minutes.textContent = minutes;
      } else {
        minutes = 59;
        refs.minutes.textContent = minutes;
        if (hours !== 0) {
          hours -= 1;
          refs.hours.textContent = hours;
        } else {
          hours = 23;
          refs.hours.textContent = hours;
          if (days !== 0) {
            days -= 1;
            refs.days.textContent = days;
          }
        }
        clearInterval(interval);
      }
    }
    refs.seconds.textContent = seconds.toString().padStart(2, '0');
    refs.minutes.textContent = minutes.toString().padStart(2, '0');
    refs.hours.textContent = hours.toString().padStart(2, '0');
    refs.days.textContent = days.toString().padStart(2, '0');
  }, 1000);
}
