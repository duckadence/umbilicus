var play = true;

document.addEventListener("DOMContentLoaded", function () {
  var iframe = document.createElement("iframe");
  iframe.setAttribute("id", "youtube");
  iframe.setAttribute("width", "0");
  iframe.setAttribute("height", "0");
  iframe.setAttribute(
    "src",
    "https://www.youtube-nocookie.com/embed/5qap5aO4i9A?enablejsapi=1&autoplay=1"
  );
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute(
    "allow",
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  );
  document.body.appendChild(iframe);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  if (request.greeting === "hello") {
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
    sendResponse({ farewell: "goodbye" });
  }
});
