chrome.browserAction.onClicked.addListener(popupActive)

function popupActive

let TIME_LIMIT = 0;
let timePassed;
let timeLeft = TIME_LIMIT;
let timerInterval = null;

chrome.runtime.onMessage.addListener();

function onTimesUp() {
  clearInterval(timerInterval);
  TIME_LIMIT = 0;
  timeLeft = TIME_LIMIT;
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    if (timeLeft <= 0) {
      onTimesUp();
    }
  }, 1000);
}
