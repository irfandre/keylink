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

function createMenuItemWithIcon(iconUrl) {
    chrome.contextMenus.create({
        id: "myContextMenuItem",
        title: "My Context Menu Item",
        contexts: ["all"],
    });
}

// Example usage: create a context menu item with an icon
createMenuItemWithIcon("images/icon.png");

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "myContextMenu") {
        // Handle the context menu click
        console.log("Context menu item clicked!");
        console.log("Clicked element:", info.target);
    }
});

chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { hostEquals: "example.com" }, // Specify the website to disable the extension on
                    }),
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()],
            },
        ]);
    });
});

// Initialize tab history from local storage or create a new array
let tabHistory = [];
var currentTab;
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

function tabLeftToCurrentTab() {
    chrome.tabs.query({ currentWindow: true }, function(tabs) {
        if (tabs.length > 0) {
            let currentTab = tabs.find(tab => tab.active);
            if (currentTab) {
                let currentIndex = currentTab.index;
                let leftTab = tabs.find(tab => tab.index === currentIndex - 1);
                if (leftTab) {
                    console.log("Left tab:", leftTab);
                    chrome.tabs.update(leftTab.id, {active: true});
                } else {
                    console.log("No tab to the left of the current tab");
                }
            } else {
                console.error("No active tab found");
            }
        } else {
            console.error("No tabs found in the current window");
        }
    });

}

// Function to switch to the previous tab
function switchToPreviousTab() {
    if (tabHistory.length === 2) {
        const previousTab = tabHistory[0];
        chrome.tabs.update(previousTab.id, { active: true }, (updatedTab) => {
            if (chrome.runtime.lastError) {
                // console.error(
                    // "Error updating tab:",
                    // chrome.runtime.lastError.message,
                // );
                tabLeftToCurrentTab()
            } else {
                console.log("Switched to the previous tab:", updatedTab);
            }
        });
    }
}

// Function to get information about the current tab
function getCurrentTab() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        currentTab = tabs[0];
        console.log("Current tab:", currentTab);

        // Update tab history
        updateTabHistory(currentTab);
    });
}

// Execute the function when the extension is clicked
try {
    chrome.action.onClicked.addListener(getCurrentTab);
} catch (e) {
    console.log("onClicked");
}

getCurrentTab();
// background.js

/// background.js

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "setCheckboxValue") {
        // Retrieve the value to set
        var value = request.value;
        // Set the value of the checkbox in Chrome storage
        chrome.storage.local.set({ showPAA: value }, function () {
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

    if (request.action === "switchTab") {
        getCurrentTab();
        sendResponse({ res: tabHistory });
        switchToPreviousTab();
        return true;
    }

    if (request.action === "visibilitychange") {
        getCurrentTab();
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
