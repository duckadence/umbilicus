var play = false;

function startOrStopMusic() {
  chrome.runtime.sendMessage({ greeting: "hello" }, function (response) {
    console.log(response.farewell);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var link = document.getElementById("play");

  link.addEventListener("click", function () {
    startOrStopMusic();
  });
});
