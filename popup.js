const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

let TIME_LIMIT = 0;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.addEventListener("DOMContentLoaded", function () {
  var link = document.getElementById("play");

  link.addEventListener("click", function () {
    startOrStopMusic();
  });
});


document.getElementById("timer").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML =
      formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
      const div = document.getElementById('input-container');
      div.style.opacity = '1';
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

document.getElementById("button").addEventListener("click", setTime);

function setTime() {
    TIME_LIMIT = document.getElementById('number').value * 60;
    document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
    startTimer();
    const div = document.getElementById('input-container');
    div.style.opacity = '0';

function onChangeSlider() {}

// slider code
//var slider = document.getElementById("volumeProgress");

var slider = document.getElementById("volumeSlider");
var output = document.getElementById("sliderValue");
output.innerHTML = slider.value;

slider.oninput = function () {
  var progressBar = document.getElementById("volumeProgress");
  progressBar.value = slider.value;
  var sliderValue = document.getElementById("sliderValue");
  sliderValue.innerHTML = slider.value;

  changeVolume();
};

var play = false;

function startOrStopMusic() {
  chrome.runtime.sendMessage({ command: "start/stop" }, function (response) {
    console.log(response.res);
  });
}

function changeVolume() {
  console.log(slider.value);
  chrome.runtime.sendMessage(
    { command: "volume", volume: slider.value },
    function (response) {
      console.log(response.res);
    }
  );
}
