let countdown ;
const timerDisplay = document.querySelector(".display_time-left");
const endTime = document.querySelector('.display_time-end');
const buttons = document.querySelectorAll('[data-time]');
const pause = document.querySelector('.pause');
const resume = document.querySelector('.resume');

function timer(seconds) {
    // clear anny existing counter
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

   countdown = setInterval(() => {
       const secondsLeft = Math.round((then - Date.now()) / 1000);
       if (secondsLeft < 0) {
            clearInterval(countdown);
            return
        }
        displayTimeLeft(secondsLeft);
    }, 1000)
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds/60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const display = `Be back at: ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
    endTime.textContent = display;

}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
    
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.userForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset(); // clear out the value
});

let paused = false;
let time_left;

pause.addEventListener('click', function (e) {
    if(!paused) {
        paused = true;
        clearInterval(countdown); // stop the clock
    }
});

resume.addEventListener('click', function (e) {
    if(paused) {
        paused = false;
        time_left = secondsLeft;
        displayTimeLeft(time_left);

    }
});