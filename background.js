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
let reloaded = false;

chrome.runtime.onStartup.addListener((details) => {
        if (details) {
                //pass
                var test;
        } else if ( details.reason !== undefined ){
                if (details.reason === "update" && !reloaded) {
                        console.log("Extension updated. Reloading...");
                        reloaded = true;
                        chrome.runtime.reload();
                        reloadFlag = true; // Set the flag to true to prevent further reloads
                }
        }

        // chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        //     if (tabs.length > 0) {
        //       chrome.tabs.sendMessage(tabs[0].id, { action: 'reloadContentScript' });
        //     }
        //   });
});

function createMenuItemWithIcon(iconUrl) {
        const menuItemId = "myUniuContextMenuItem";

        // Remove the existing menu item if it exists
        chrome.contextMenus.remove(menuItemId, () => {
                // Check for errors in removing
                if (chrome.runtime.lastError) {
                        console.warn(`Error removing context menu item: ${chrome.runtime.lastError.message}`);
                }

                // Create the new context menu item
                chrome.contextMenus.create({
                        id: menuItemId,
                        title: "My Context Menu Item",
                        contexts: ["all"],
                }, () => {
                        // Check for errors in creating
                        if (chrome.runtime.lastError) {
                                console.error(`Error creating context menu item: ${chrome.runtime.lastError.message}`);
                        }
                });
        });
}

// Example usage: create a context menu item with an icon
try {
        //createMenuItemWithIcon("images/icon.png");
} catch (e) {
        console.log("duplicate error");
}

chrome.contextMenus.onClicked.addListener(function (info, tab) {
        if (info.menuItemId === "myContextMenu") {
                // Handle the context menu click
                console.log("Context menu item clicked!");
                console.log("Clicked element:", info.target);
        }
});

// chrome.runtime.onInstalled.addListener(function () {
//     chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
//         chrome.declarativeContent.onPageChanged.addRules([
//             {
//                 conditions: [
//                     new chrome.declarativeContent.PageStateMatcher({
//                         pageUrl: { hostEquals: "example.com" }, // Specify the website to disable the extension on
//                     }),
//                 ],
//                 actions: [new chrome.declarativeContent.ShowPageAction()],
//             },
//         ]);
//     });
// });

// Initialize tab history from local storage or create a new array
let tabHistory = [];
var currentTab;

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

let disabledWebsites = [];

function getDisabledWebsites() {
        // body...
        chrome.storage.local.get(["disabledWebsites"], function (data) {
                disabledWebsites = data.disabledWebsites || [];
        });
}

function setDisabledWebsites(currentTab) {
        // body...
        disabledWebsites.push(currentTab);
        chrome.storage.local.set(
                { disabledWebsites: disabledWebsites },
                function () {
                        // alert(disabledWebsites);

                        console.log("none");
                },
        );
}

function tabLeftToCurrentTab() {
        chrome.tabs.query({ currentWindow: true }, function (tabs) {
                if (tabs.length > 0) {
                        let currentTab = tabs.find((tab) => tab.active);
                        if (currentTab) {
                                let currentIndex = currentTab.index;
                                let leftTab = tabs.find(
                                        (tab) => tab.index === currentIndex - 1,
                                );
                                if (leftTab) {
                                        console.log("Left tab:", leftTab);
                                        chrome.tabs.update(leftTab.id, { active: true });
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
                console.log(
                        "switch to previous tab window id ",
                        tabHistory[0].windowId,
                );
                chrome.windows.update(previousTab.windowId, { focused: false });
                chrome.tabs.update(previousTab.id, { active: true }, (updatedTab) => {
                        if (chrome.runtime.lastError) {
                                // console.error(
                                // "Error updating tab:",
                                // chrome.runtime.lastError.message,
                                // );
                                tabLeftToCurrentTab();
                        } else {
                                console.log("Switched to the previous tab:", updatedTab);
                        }
                });
        }
}

// background.js
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     if (message.action === 'windowFocused') {
//         console.log('Window focused!');
//         // Perform your actions here
//     }
// });

chrome.windows.onFocusChanged.addListener(function (windowId) {
        console.log("Focus changed to window with ID:", windowId);
        // You can perform any actions you need here
        // chrome.windows.update(1651283528, { focused: true });
        // switchToPreviousTab();
        getCurrentTab();
});

// window.addEventListener('focus', function() {
//     chrome.runtime.sendMessage({ action: 'windowFocused' });
// });

// Function to get information about the current tab
function getCurrentTab() {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                currentTab = tabs[0];
                console.log("Current tab:", currentTab);

                // Update tab history
                updateTabHistory(currentTab);
        });
}
function justGetCurrentTab() {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                currentTab = tabs[0];
                console.log("Current tab:", currentTab);
        });
}
// function returnCurrentTab(){
// chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//         currentTab = tabs[0];
//         return currentTab;
//     }

// }
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
                // return true;
        } else if (request.action === "getCheckboxValue") {
                // Retrieve the value of the checkbox from Chrome storage
                chrome.storage.local.get({ showPAA: false }, function (items) {
                        // Send the retrieved value back to the content script
                        sendResponse({ checkboxValue: items.showPAA });
                });
                // To indicate that sendResponse will be asynchronously
                return true;
        } else if (request.action === "switchTab") {
                getCurrentTab();
                sendResponse({ res: tabHistory });
                switchToPreviousTab();
                return true;
        } else if (request.action === "visibilitychange") {
                getCurrentTab();
                getDisabledWebsites();
                setDisabledWebsites();
                sendResponse({ res: tabHistory });
                return true;
        } else if (request.action === "update") {
                // getCurrentTab();

                // justGetCurrentTab();
                // getDisabledWebsites();
                // setDisabledWebsites(currentTab);
                try {
                        chrome.action.setBadgeText({ text: "42" }); // Set the badge text to "42"
                } catch (e) {
                        console.log("catch");
                }

                sendResponse({ res: tabHistory });
                return true;
        } else if (request.action === "clear") {
                // getCurrentTab();

                // justGetCurrentTab();
                // getDisabledWebsites();
                // setDisabledWebsites(currentTab);
                // if(disabledWebsites.includes(tabHistory[1])){

                // }

                sendResponse({ res: tabHistory });
                return true;
        }
});
chrome.action.setBadgeText({ text: "2" });
chrome.action.onClicked.addListener((tab) => {
        chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: getURL,
        });
});

console.log("Button");

function getURL() {
        chrome.runtime.sendMessage({ action: "getURL" });
}

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
        if (result.tabHistory !== undefined) {
                tabHistory = result.tabHistory;
                console.log("Tab history loaded from local storage:", tabHistory);
        }
});

// Background script to listen to messages from popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.action === 'checkDisabledState') {
                chrome.storage.local.get([message.tabId], function(result) {
                        sendResponse(result[message.tabId] ? result[message.tabId].disabled : false);
                });
                // Required to indicate that you will send a response asynchronously
                return true;
        }
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log("Message received:", message);

        if (message.action === "showAlert") {
                chrome.scripting.executeScript({
                        target: { tabId: sender.tab.id },
                        function: showAlert,
                        args: ["Button clicked!"]
                });
        }
});

function showAlert(message) {
        alert(message);
}

chrome.runtime.onInstalled.addListener(() => {
        console.log("Extension Installed");
});

// Function to create a notification
function createNotification(message) {
        chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icon.png', // Path to your icon
                title: 'Notification',
                message: message,
                priority: 2
        });
}

// Example usage
//createNotification("This is a custom notification!");

