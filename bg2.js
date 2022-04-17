
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.status === "inactive") {
        if (timeLeft <= 0) {
            sendResponse({ status: "inactive" });
        } else if (timeLeft > 0) {
            sendResponse({ status: "active", timeMax: TIME_LIMIT, timeRemain: timeLeft, timeOver: timePassed });
        } else {
        }
    } else if (request.status === "active") {
        TIME_LIMIT = request.timeMax;
        timeLeft = request.timeRemain;
        timePassed = request.timeOver;
        console.log(timeLeft);
        startTimer();
    } else if (request.status === "finish") {
        onTimesUp;
    }
});

let TIME_LIMIT = 0;
let timePassed = 0;
let timeLeft = 0;
let timerInterval = null;

function onTimesUp() {
  clearInterval(timerInterval);
  TIME_LIMIT = 0;
  timeLeft = TIME_LIMIT;
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    if (timeLeft <= 0) {
      onTimesUp();
    }
  }, 1000);
}

