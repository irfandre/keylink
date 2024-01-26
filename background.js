// background.js
chrome.runtime.onInstalled.addListener(function () {
  // Perform tasks when the extension is installed or updated
  console.log("Extension installed or updated.");
});

chrome.action.onClicked.addListener(function (tab) {
  // Perform tasks when the extension icon in the toolbar is clicked
  console.log("Extension icon clicked!");
  alert("hi");
  // Open the popup UI
  chrome.action.openPopup();
});

// background.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "runCode") {
    // Code to execute when the button is clicked
    console.log("Button clicked! Running code...");

    // Example: Changing the background color of the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "changeBackgroundColor" });
    });
  }
});

// Chrome extension example
chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
  var lastActiveTab = tabs[0];
  console.log("Last active tab:", lastActiveTab);
});
