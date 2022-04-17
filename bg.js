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
  } else {
  }
});
