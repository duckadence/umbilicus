let TIME_LIMIT = 0;
let timePassed;
let timeLeft = TIME_LIMIT;
let timerInterval = null;

chrome.runtime.onMessage.addListener()

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;

      onTimesUp();
    }
  }, 1000);
}
