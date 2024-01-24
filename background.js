// background.js
chrome.runtime.onInstalled.addListener(function() {
  // Perform tasks when the extension is installed or updated
  console.log("Extension installed or updated.");
});

chrome.action.onClicked.addListener(function(tab) {
  // Perform tasks when the extension icon in the toolbar is clicked
  console.log("Extension icon clicked!");
  alert('hi');  
  // Open the popup UI
  chrome.action.openPopup();
});