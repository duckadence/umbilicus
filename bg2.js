var filter = [
  "www.facebook.com",
  "www.instagram.com",
  "www.snapchat.com",
  "www.tiktok.com",
  "www.discord.com",
];

blockInterval = setInterval(() => {
  getActiveTab((t) => {
    // console.log(t);
    if (t != undefined) {
      filter.forEach((site) => {
        if (t.url.includes(site)) {
          window.location.replace(
            "https://barexamblogrwu.files.wordpress.com/2019/06/visualization-and-motivation.jpg"
          );
          chrome.tabs.update(undefined, {
            url: "https://barexamblogrwu.files.wordpress.com/2019/06/visualization-and-motivation.jpg",
          });
        }
      });
    }
  });
}, 1000);

var activeTabId;

chrome.tabs.onActivated.addListener(function (activeInfo) {
  activeTabId = activeInfo.tabId;
});

function getActiveTab(callback) {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var tab = tabs[0];

    if (tab) {
      callback(tab);
    } else {
      chrome.tabs.get(activeTabId, function (tab) {
        if (tab) {
          callback(tab);
        } else {
          console.log("No active tab identified.");
        }
      });
    }
  });
}
