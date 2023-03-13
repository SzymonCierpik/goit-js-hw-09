import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

const startButton = document.querySelector('[data-start]');
startButton.setAttribute(`disabled`, `disabled`);

let targetDate;
let options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
    } else {
      startButton.removeAttribute('disabled');
      targetDate = new Date(selectedDates[0]).getTime();
      const newTime = convertMs(targetDate - new Date().getTime());
      days.textContent = formatNumber(newTime.days);
      hours.textContent = formatNumber(newTime.hours);
      minutes.textContent = formatNumber(newTime.minutes);
      seconds.textContent = formatNumber(newTime.seconds);
    }
  },
};

let intervalId;
startButton.addEventListener(`click`, function () {
  intervalId = setInterval(function () {
    const newTime = convertMs(targetDate - new Date().getTime());
    days.textContent = formatNumber(newTime.days);
    hours.textContent = formatNumber(newTime.hours);
    minutes.textContent = formatNumber(newTime.minutes);
    seconds.textContent = formatNumber(newTime.seconds);

    if (targetDate - new Date().getTime() <= 0) {
      clearInterval(intervalId);
      days.textContent = '00';
      hours.textContent = '00';
      minutes.textContent = '00';
      seconds.textContent = '00';
    }
  }, 1000);
});

function formatNumber(num) {
  return num.toString().padStart(2, '0');
}

flatpickr('#datetime-picker', options);

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
