// background.js
// chrome.runtime.onInstalled.addListener(function () {
//   // Perform tasks when the extension is installed or updated
//   console.log("Extension installed or updated.");
// });

// chrome.action.onClicked.addListener(function (tab) {
//   // Perform tasks when the extension icon in the toolbar is clicked
//   console.log("Extension icon clicked!");
//   alert("hi");
//   // Open the popup UI
//   chrome.action.openPopup();
// });

// // background.js
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.action === "runCode") {
//     // Code to execute when the button is clicked
//     console.log("Button clicked! Running code...");

//     // Example: Changing the background color of the active tab
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, { action: "changeBackgroundColor" });
//     });
//   }
// });

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
});

// Initialize tab history from local storage or create a new array
let tabHistory = [];

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
});

// Function to update tab history
function updateTabHistory(tab) {
    // Push the current tab to the history
    tabHistory.push(tab);

    // Keep only the last 2 tabs in the history array
    if (tabHistory.length > 2) {
        tabHistory.shift();
    }

    // Save the updated tab history to local storage
    chrome.storage.local.set({ tabHistory: tabHistory });
}

// Function to switch to the previous tab
function switchToPreviousTab() {
    if (tabHistory.length === 2) {
        const previousTab = tabHistory[0];
        chrome.tabs.update(previousTab.id, { active: true }, (updatedTab) => {
            if (chrome.runtime.lastError) {
                console.error(
                    "Error updating tab:",
                    chrome.runtime.lastError.message,
                );
            } else {
                console.log("Switched to the previous tab:", updatedTab);
            }
        });
    }
}

// Function to get information about the current tab
function getCurrentTab() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        const currentTab = tabs[0];
        console.log("Current tab:", currentTab);

        // Update tab history
        updateTabHistory(currentTab);
    });
}

// Execute the function when the extension is clicked
chrome.action.onClicked.addListener(getCurrentTab);

// background.js

/// background.js

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "setCheckboxValue") {
        // Retrieve the value to set
        var value = request.value;
        // Set the value of the checkbox in Chrome storage
        chrome.storage.local.set({ showPAA: value }, function() {
            console.log("Checkbox value set to", value);
        });
    } else if (request.action === "getCheckboxValue") {
        // Retrieve the value of the checkbox from Chrome storage
        chrome.storage.local.get({ showPAA: false }, function (items) {
            // Send the retrieved value back to the content script
            sendResponse({ checkboxValue: items.showPAA });
        });
        // To indicate that sendResponse will be asynchronously
        return true;
    }
});



// Listen for tab switching events
chrome.tabs.onActivated.addListener((info) => {
    // Get information about the currently activated tab
    chrome.tabs.get(info.tabId, (tab) => {
        console.log("Tab activated:", tab);

        // Update tab history
        updateTabHistory(tab);
    });
});

// Load the tab history from local storage on extension startup
chrome.storage.local.get(["tabHistory"], function (result) {
    if (result.tabHistory) {
        tabHistory = result.tabHistory;
        console.log("Tab history loaded from local storage:", tabHistory);
    }
});
