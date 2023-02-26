import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('button[data-start');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

startBtnEl.setAttribute("disabled", true);  

const selectedDates = null;
let selectedTime = 0;
let deltaTime = 0;
let currentTime = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {

        console.log(selectedDates[0]);
        selectedTime = selectedDates[0].getTime();
        currentTime = Date.now();
        deltaTime = selectedTime - currentTime;
        
        if (deltaTime <= 0) {
            Notify.failure("Please choose a date in the future");
        } else
            startBtnEl.removeAttribute("disabled");
            return selectedTime;        
    },
};

flatpickr(inputEl, options);
let intervalID = null;
const backCount= {
    
    isActive: false,
    
 
    start() {
       
        if (this.isActive) {
            return;
        }
        this.isActive = true;
      
         intervalID = setInterval(() => {
             currentTime = Date.now();
           
             deltaTime = selectedTime - currentTime;
             

                  if (deltaTime<=0) {                 
                 clearInterval(intervalID);
                      return;
                  }
     
             const { days, hours, minutes, seconds } = convertMs(deltaTime);     
 
             updateCounterFace({ days, hours, minutes, seconds });
             
         }, 1000);       
       
    }
}

 startBtnEl.addEventListener('click', backCount.start);

function updateCounterFace({ days, hours, minutes, seconds }) {
    daysEl.textContent = `${days}`;
    hoursEl.textContent = addLeadingZero(`${hours}`);
    minutesEl.textContent = addLeadingZero(`${minutes}`);
    secondsEl.textContent = addLeadingZero(`${seconds}`);
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
  }

function addLeadingZero(value){
    return value.padStart(2, "0");
}