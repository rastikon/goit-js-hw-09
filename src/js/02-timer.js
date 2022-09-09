// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_blue.css');

// Підключення бібліотеки повідомлень
import Notiflix from 'notiflix';

const setDate = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const date = Date.now();

const options = {
  isActive: false,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (this.isActive) {
      return;
    }
    if (selectedDates[0] > date) {
      startBtn.disabled = false;
      startBtn.addEventListener('click', () => {
        this.isActive = true;
        const makeTimer = setInterval(() => {
          const deltaTime = selectedDates[0] - Date.now();
          const timer = convertMs(deltaTime);
          //   Зупиняє таймер відліку ґкщо дійшло до вибраного часу
          if (deltaTime <= 0) {
            clearInterval(makeTimer);
          } else {
            updateTimer(timer);
          }
        }, 1000);
      });
    } else Notiflix.Notify.failure('Please choose a date in the future');
  },
};

startBtn.disabled = true;
flatpickr(setDate, options);

//Приймає число, переводить в рядок, додає 0 на початок якщо менше двох символів
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Конвертація часу з мілісекунд
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// Відображення відліку часу на сторінці
function updateTimer({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = `${days}`;
  document.querySelector('[data-hours]').textContent = `${hours}`;
  document.querySelector('[data-minutes]').textContent = `${minutes}`;
  document.querySelector('[data-seconds]').textContent = `${seconds}`;
}
