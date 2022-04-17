var play = true;
var volume = 50;

document.addEventListener("DOMContentLoaded", function () {
  var iframe = document.createElement("iframe");
  iframe.setAttribute("id", "youtube");
  iframe.setAttribute("width", "0");
  iframe.setAttribute("height", "0");
  iframe.setAttribute(
    "src",
    "https://www.youtube.com/embed/5qap5aO4i9A?enablejsapi=1"
  );
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute(
    "allow",
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  );
  document.body.appendChild(iframe);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.command);
  if (request.command === "start/stop") {
    if (play) {
      //   $(".youtube-video")[0].contentWindow.postMessage(
      document
        .getElementById("youtube")
        .contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
      play = false;
    } else {
      //   $(".youtube-video")[0].contentWindow.postMessage(
      document
        .getElementById("youtube")
        .contentWindow.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          "*"
        );
      play = true;
    }
    sendResponse({ res: "done." });
  } else if (request.command === "setVolume") {
    volume = request.volume;
    document
      .getElementById("youtube")
      .contentWindow.postMessage(
        '{"event":"command","func":"setVolume","args":' +
          "[" +
          request.volume +
          "]" +
          "}",
        "*"
      );
    sendResponse({ res: "done." });
  } else if (request.command === "getVolume") {
    sendResponse({ res: volume });
  } else if (request.status === "inactive") {
    if (timeLeft <= 0) {
      sendResponse({ status: "inactive" });
    } else if (timeLeft > 0) {
      sendResponse({
        status: "active",
        timeMax: TIME_LIMIT,
        timeRemain: timeLeft,
        timeOver: timePassed,
      });
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
  fadeMusic();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fadeMusic() {
  let x = volume / 10;
  var curVolume = volume;
  for (var i = 0; i < 10; i++) {
    document
      .getElementById("youtube")
      .contentWindow.postMessage(
        '{"event":"command","func":"setVolume","args":' +
          "[" +
          curVolume +
          "]" +
          "}",
        "*"
      );
    curVolume -= x;
    await sleep(300);
  }
  document
    .getElementById("youtube")
    .contentWindow.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      "*"
    );
}

function startTimer() {
  clearInterval(timerInterval);
  document
    .getElementById("youtube")
    .contentWindow.postMessage(
      '{"event":"command","func":"playVideo","args":""}',
      "*"
    );
  document
    .getElementById("youtube")
    .contentWindow.postMessage(
      '{"event":"command","func":"playVideo","args":""}',
      "*"
    );
  document
    .getElementById("youtube")
    .contentWindow.postMessage(
      '{"event":"command","func":"setVolume","args":' +
        "[" +
        volume +
        "]" +
        "}",
      "*"
    );
  timerInterval = setInterval(() => {
    timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    if (timeLeft <= 0) {
      onTimesUp();
    }
  }, 1000);
}

