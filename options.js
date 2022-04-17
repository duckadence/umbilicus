// Prints list of blocked websites
function printList(arr) {
  // (B2) CREATE LIST
  var list = document.createElement("ol");
  for (let i of arr) {
    let item = document.createElement("li");
    item.innerHTML = i;
    list.appendChild(item);
  }

  // (B3) APPEND LIST TO CONTAINER
  document.getElementById("webList").appendChild(list);
}

// Adds website to list of blocked sites
function addToBlocked(website) {
  chrome.storage.sync.get({
    blockedWebsites:[] //put defaultvalues if any
  }, function(data) {
    data.blockedWebsites.push(String(website));
    // then call the set to update with modified value
    chrome.storage.sync.set({
      blockedWebsites:data.blockedWebsites
    })
  });
}

// Removes website from list of blocked sites
function removeFromBlocked(website) {
  chrome.storage.sync.get({
    blockedWebsites:[] //put defaultvalues if any
  }, function(data) {
    // Checks if the url that will be deleted is in the array:
    if (data.blockedWebsites.includes(website)) {

      // create a new array without url
      var newUrlList = data.blockedWebsites.filter(function(item) { 
        return item !== website;
      });

      // set new url list to the storage
      chrome.storage.sync.set({ 
        blockedWebsites: newUrlList 
      });
    }
  });
}

// Saves options to chrome.storage
function save_options() {
  var color = document.getElementById("color").value;
  var likesColor = document.getElementById("like").checked;
  chrome.storage.sync.set(
    {
      favoriteColor: color,
      likesColor: likesColor,
    },
    function () {
      // Update status to let user know options were saved.
      var status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function () {
        status.textContent = "";
      }, 750);
    }
  );
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  var websites = [
    "www.facebook.com", 
    "www.instagram.com", 
    "www.snapchat.com", 
    "www.tiktok.com",
    "www.discord.com"
  ];
  chrome.storage.sync.set({
    blockedWebsites: websites,
  });
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get(
    {
      favoriteColor: "red",
      likesColor: true,
      blockedWebsites: websites,
    },
    function (items) {
      document.getElementById("color").value = items.favoriteColor;
      document.getElementById("like").checked = items.likesColor;
      document.getElementById("blocked").value = items.blockedWebsites;
    }
  );
  var addButton = document.getElementById("add");
  if(addButton) {
    addButton.onclick = function() {addToBlocked("www.pinterest.com"); 
    chrome.storage.sync.get({
      blockedWebsites:[]
    }, function(data) {
      printList(data.blockedWebsites);
    });
    };
  }
}

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);

chrome.storage.sync.get({
  blockedWebsites:[]
}, function(data) {
  printList(data.blockedWebsites);
});
//addToBlocked("www.pinterest.com");
//removeFromBlocked("www.pinterest.com");
//var input = document.getElementById("url").value;






