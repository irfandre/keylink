// content.js
let isPaachecked;
let mainWeb;
var one;
var disableInCurrent = true;
let isJkwz; 

chrome.storage.local.get(["disabledWebsites"], function (data) {
    var disabledWebsites = data.disabledWebsites || [];
    // alert(disabledWebsites);
    if (disabledWebsites.includes(window.location.href)) {
        // alert("this page is disabled")
        if (window.location.hostname === "www.google.com") {
            setTimeout(() => {
                removeSpanTag();
                disableInCurrent = true;
                // updateAlpha();
            }, 1000);
        }
    } else {
        disableInCurrent = false;
        // updateAlpha();
    }
});

// RETRIEVE LOCAL VARIABLES 
chrome.storage.local.get(null, function(items) {
  // console.log('All items in storage:', items);
  // alert(items);
  // Using Object.entries() to iterate
  if (items) {
      Object.entries(items).forEach(([key, value]) => {
        // console.log(`Key: ${key}, Value:`, value);
        if (key === 'setting1'){
            isJkwz = value;
        }
      });
    }
});

/* 
Clipboard Functionality 
*/
function writeToClipboard(text) {
    navigator.clipboard
        .writeText(text)
        .then(function () {
            console.log("Text copied to clipboard successfully: " + text);
        })
        .catch(function (error) {
            console.error("Unable to copy text to clipboard: ", error);
        });
}

async function readFromClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        console.log("Text from clipboard:", text);
        // return text;
        alert(encodeURI(text));

        writeToClipboard(encodeURI(text));
    } catch (error) {
        console.error("Failed to read from clipboard:", error);
        // return null;
    }
}
// End

document.addEventListener("visibilitychange", (event) => {
    if (document.visibilityState == "visible") {
        // console.log("tab is active", Object.keys(event));
        setTimeout(() => {}, 2000);
        try {
            // sendMessageToBackground("update");
            // sendMessageToBackground("update");
            // chrome.runtime.sendMessage({ action: "update", hostname: event.srcElement.URL });
            // mainWeb[1] = event.srcElement.URL;

            console.log("tab is active", event.srcElement.URL);
            // alert(mainWeb);
        } catch (e) {
            console.log("error");
        }
        // updateTabHistory();
        // console.log(tabHistory);
        if (window.location.hostname === "www.google.com") {
            updateAlpha();
            // alert("running alpha");
        }
    } else {
        console.log("tab is inactive", document.deferrer);
    }
});
var disabledWebsites = [];
function sendMessageToBackground(sendAction) {
    try {
        // Attempt to send a message
        chrome.runtime.sendMessage({ action: sendAction }, function (response) {
            console.log("Response from background script:", response);
            if (response.res && sendAction === "update") {
                console.log(response.res[1].url);
                mainWeb = response.res[1].url;
                alert("------" + mainWeb + sendAction);
                chrome.storage.local.get(["disabledWebsites"], function (data) {
                    disabledWebsites = data.disabledWebsites || [];
                    if (!disabledWebsites.includes(mainWeb)) {
                        disabledWebsites.push(mainWeb);
                        chrome.storage.local.set(
                            { disabledWebsites: disabledWebsites },
                            function () {
                                // alert('Current URL added to disabled websites:\n\nDisabled Websites:\n' + disabledWebsites.join('\n') + '\n\nCurrent URL:\n' + currentHostName);
                                alert("set");
                            },
                        );
                    } else {
                        // alert('Current URL is already in disabled websites:\n\nDisabled Websites:\n' + disabledWebsites.join('\n') + '\n\nCurrent URL:\n' + currentHostName);
                        // alert("****"+disabledWebsites);
                        console.log("****" + disabledWebsites);
                    }
                });
            } else if (
                response &&
                response.checkboxValue !== "undefined" &&
                sendAction !== "clear"
            ) {
                // alert('check box value ' + response.checkboxValue );
                one = response.checkboxValue;
            } else if (sendAction === "clear") {
                alert("inclear");
                disabledWebsites = disabledWebsites.filter(
                    (item) => item !== response.res[1].url,
                );
                chrome.storage.local.set(
                    { disabledWebsites: disabledWebsites },
                    function () {
                        // alert(disabledWebsites);
                        console.log("none");
                    },
                );
            } else {
                alert("message?: DOMString");
            }
        });
    } catch (error) {
        console.log("console.error", error);
    }
}

document.addEventListener("keydown", scrollEvents);
window.onload = wait;

sendMessageToBackground("getCheckboxValue");

// Get the current date
const currentDate = new Date();

// Calculate 30 days before
const date30DaysBefore = new Date(currentDate);
date30DaysBefore.setDate(currentDate.getDate() - 30);

// Calculate 6 months before
const date6MonthsBefore = new Date(currentDate);
date6MonthsBefore.setMonth(currentDate.getMonth() - 6);

// Calculate 1 year before
const date1YearBefore = new Date(currentDate);
date1YearBefore.setFullYear(currentDate.getFullYear() - 1);

function formatDate(date) {
    const year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function scrollEvents(event) {
    // Check if the pressed key is 'j'
    if (event.key !== undefined) {
        var activeElement = document.activeElement;

        var input_fields = ["textarea", "input"];

        if (
            input_fields.includes(activeElement.tagName.toLowerCase()) ||
            activeElement.getAttribute("contenteditable") === "true" // DISABLE SCROLLING WHEN IN INPUT FIELDS OR CONTENTEDITABL    E DIVS
        ) {
            console.log("Cursor is in an input field.");
            // console.dir(activeElement);
        } else if (event.key.toLowerCase() === ",") {
            // Create a new keyboard event for the down arrow key
            window.scrollBy(0, 100);
            // document.dispatchEvent(downArrowEvent);
        } else if (event.key.toLowerCase() === ".") {
            window.scrollBy(0, -100);
        } else if (isJkwz || window.location.hostname !== "www.google.com") {
            if (
                (event.key.toLowerCase() === "j" ||
                    event.key.toLowerCase() === "z") &&
                window.location.hostname !== "www.youtube.com"
            ) {
                window.scrollBy(0, 100);
            } else if (
                (event.key.toLowerCase() === "k" ||
                    event.key.toLowerCase() === "w") &&
                window.location.hostname !== "www.youtube.com"
            ) {
                window.scrollBy(0, -100);
            }
        } else if (event.shiftKey && event.key === "g") {
            console.log("Alt key + G key pressed");
            try {
                window.scrollTo(0, 0);
            } catch (e) {
                console.log("error");
            }
        } 
        
        var textarea = document.getElementsByTagName("textarea");

        if (activeElement.tagName.toLowerCase() !== "textarea" && window.location.hostname === "www.google.com") {
                // Additional actions when the textarea is not in focus can go here
                if (event.shiftKey && event.key === "M") {
                    console.log("shift key + M key pressed");
                    try {
                        // var textarea = document.getElementsByTagName("textarea");
                        textarea[0].value = textarea[0].value.replace(/\s*after:.*$/, '');
                        textarea[0].value = textarea[0].value.trim();
                        var form = document.getElementsByTagName("form");
                        textarea[0].value +=  " after:" + formatDate(date30DaysBefore);
                        form[0].submit();
                    } catch (e) {
                        console.log("error");
                    }
                }

                if (event.shiftKey && event.key === "^") {
                    console.log("shift key + 6 key pressed");
                    try {
                        textarea[0].value = textarea[0].value.replace(/\s*after:.*$/, '');
                        textarea[0].value = textarea[0].value.trim();
                        var form = document.getElementsByTagName("form");
                        textarea[0].value += " after:" + formatDate(date6MonthsBefore);
                        form[0].submit();
                    } catch (e) {
                        console.log("error");
                    }
                }

                if (event.shiftKey && event.key === "Y") {
                    console.log("shift key + Y key pressed");
                    try {
                        textarea[0].value = textarea[0].value.replace(/\s*after:.*$/, '');
                        textarea[0].value = textarea[0].value.trim();
                        var form = document.getElementsByTagName("form");
                        textarea[0].value += " after:" + formatDate(date1YearBefore);
                        form[0].submit();
                    } catch (e) {
                        console.log("error");
                    }
                }
            };
        

        // ENCODE COPIED TEXT
        if (event.metaKey && event.key === "u") {
            console.log("comand and u enteredl");
            readFromClipboard();
        }

        // SWITCH TO PREVIOUS TAB
        if (event.getModifierState("Alt") && event.code === "Minus") {
            console.log("Alt key + Minus key pressed");
            try {
                sendMessageToBackground("switchTab");
            } catch (e) {
                console.log("error");
            }
        }

        // FOCUS ON INPUT_FIELDS AND TEXTAREA 
        if (event.key === "/") {
            // focus on textarea of chatgpt website
            const textarea = document.getElementById("prompt-textarea");
            if (textarea) {
                textarea.focus();
                textarea.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                }); // SCROLL TO ACTIVE ELEMENT
            }

            // FOCUS ON FIRST INPUT ELEMENT OF ANY WEBSITE
            var inputField = document.querySelector(
                'input[type="text"],  input[type="search"], input:not([type])',
            );

            if (inputField) {
                if (activeElement.tagName.toLowerCase() !== "input") {
                    inputField.focus();
                    inputField.parentElement.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    }); // SCROLL TO ACTIVE ELEMENT
                }
            }
        }
    }
}

// Get the value of the checkbox in the webpage's DOM
function getCheckboxValue() {
    var checkbox = document.getElementById("setting2");
    if (checkbox) {
        isPaachecked = checkbox.checked;
        return checkbox.checked;
    }
    return false; // Return false if checkbox not found
}

// Send a message to the background script requesting to set the value of the checkbox in Chrome storage
function requestSetCheckboxValue(value) {
    chrome.runtime.sendMessage(
        { action: "setCheckboxValue", value: value },
        function () {
            console.log("Checkbox value set to", value);
        },
    );
}

// Send a message to the background script requesting to get the value of the checkbox from Chrome storage
function requestGetCheckboxValue() {
    chrome.runtime.sendMessage(
        { action: "getCheckboxValue" },
        function (response) {
            if (response && response.checkboxValue !== undefined) {
                // Access the retrieved value
                var checkboxValue = response.checkboxValue;
                // Do something with the retrieved value
                console.log("Checkbox Value:", checkboxValue);
                // Update the checkbox state in the webpage's DOM
                var checkbox = document.getElementById("setting2");
                if (checkbox) {
                    checkbox.checked = checkboxValue;
                    isPaachecked = checkboxValue;
                    updateAlpha();
                }
            }
        },
    );
}

async function getCheckboxState() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("checkboxState", function (data) {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(data.checkboxState || false);
                isPaachecked = data.checkboxState;
            }
        });
    });
}

// fUNCTION TO SET CHECKBOX STATE IN LOCAL STORAGE
async function setCheckboxState(state) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set({ checkboxState: state }, function () {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve();
            }
        });
    });
}

let paaPaa;

document.addEventListener("DOMContentLoaded", onPopupOpened);

var disabledWebsites;
let currentHostName = window.location.hostname;

function disabledWebsitesFunc() {
    chrome.storage.local.get(["disabledWebsites"], function (data) {
        var disabledWebsites = data.disabledWebsites || [];
        // alert(disabledWebsites);
        var listAsString = JSON.stringify(disabledWebsites);
        console.log(listAsString);
        // if (!disabledWebsites.includes(currentHostName)) {
        //   disabledWebsites.push(currentHostName);
        //   chrome.storage.local.set({ 'disabledWebsites': disabledWebsites }, function() {
        //     alert('Current URL added to disabled websites:\n\nDisabled Websites:\n' + disabledWebsites.join('\n') + '\n\nCurrent URL:\n' + currentHostName);
        //   });
        // } else {
        //   alert('Current URL is already in disabled websites:\n\nDisabled Websites:\n' + disabledWebsites.join('\n') + '\n\nCurrent URL:\n' + currentHostName);
        // }
    });
}

function onPopupOpened() {
    // if (disabledWebsites.includes(currentUrl)){

    // }
    // alert(currentHostName);

    // alert(mainWeb);
    // alert('comeing here');

    setTimeout(() => {}, 3000);

    var checkbox = document.getElementById("setting2");
    var jkwzCheckbox = document.getElementById("setting1");

    var icon = document.getElementById("icon");

    var btn = document.getElementById("disableButton");
    var clearBtn = document.getElementById("clearButton");

    if (btn) {
        btn.addEventListener("click", function () {
            sendMessageToBackground("update");

            // alert(mainWeb);
            icon.src = "images/1.png";
            // chrome.runtime.sendMessage({ action: "update", db: mainWeb });

            var currentUrl = window.location.hostname;
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", function () {
            sendMessageToBackground("clear");

            // alert(mainWeb);
            icon.src = "images/1.png";
            // chrome.runtime.sendMessage({ action: "update", db: mainWeb });

            var currentUrl = window.location.hostname;
        });
    }

    if (checkbox) {
        // Checkbox element is now available, you can use it here
        console.log("Checkbox element:", checkbox);
        isPaachecked = checkbox.checked;
        // Example: Add an event listener to the checkbox
        // alert('check box is on' + isPaachecked);
        try {
            // statements
            checkbox.addEventListener("change", function () {
                console.log("Checkbox state changed:", checkbox.checked);
                isPaachecked = checkbox.checked;
                chrome.runtime.sendMessage(
                    { action: "setCheckboxValue", value: checkbox.checked },
                    function () {
                        console.log("Checkbox value set to", checkbox.checked);
                        // alert("checkbox set " + checkbox.checked);
                    },
                );
            });
            sendMessageToBackground("getCheckboxValue");
        } catch (e) {
            // statements
            console.log(e);
        }
    } else {
        console.log("Checkbox element not found");
    }

    if (jkwzCheckbox) {
        // Checkbox element is now available, you can use it here
        console.log("Checkbox element:", checkbox);
        isJkwz = jkwzCheckbox.checked;
        // Example: Add an event listener to the checkbox
        // alert('check box is on' + isPaachecked);
        try {
            // statements
            checkbox.addEventListener("change", function () {
                console.log("Checkbox state changed:", checkbox.checked);
                isJkwz = jkwzCheckbox.checked;
                chrome.runtime.sendMessage(
                    { action: "setjkwzCheckboxValue", value: jkwzCheckbox.checked },
                    function () {
                        console.log("Checkbox value set to", jkwzCheckbox.checked);
                        // alert("checkbox set " + checkbox.checked);
                    },
                );
            });
            sendMessageToBackground("getCheckboxValue");
        } catch (e) {
            // statements
            console.log(e);
        }
    } else {
        console.log("Checkbox element not found");
    }
}

function wait() {
    // isPaachecked = chromeStorageSet();
    // setTimeout(() => {}, 3000);

    updateAlpha();
    // one = sendMessageToBackground("checkisdisabled");
    // var currentUrl;
    // chrome.runtime.sendMessage({ action: "getCurrentUrl" }, function(response) {
    //   if (response && response.url) {
    //     currentUrl = response.url;
    //     // Use the currentUrl variable as needed
    //     console.log("Current URL:", currentUrl);
    //   }
    //   else{
    //     alert('one')
    //   }
    // });

    // Function to get checkbox state from local storage

    // Get the checkbox element
    // const checkbox = document.getElementById("setting2");

    // Initialize the checkbox state
    // (async () => {
    //   checkbox.checked = await getCheckboxState();
    //   paaPaa = checkbox.checked;
    //   // alert("paa is checked ", paaPaa);
    // })();

    // Store the checkbox state in local storage when it changes
    // checkbox.addEventListener('change', async function() {
    //   await setCheckboxState(checkbox.checked);
    // });
    // alert(isPaachecked);
    // sendMessageToBackground("update");
    // alert("came here")
    // disabledWebsitesFunc();
}

// alert(paaPaa);

var botstuffHrefList;
// alert('sdjlfksd');
const targetDiv = document.querySelector("div[jsaction]");
// Select the container where the dynamic divs might be added
// const container = document.getElementById('yourContainerId');

const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
        // alert('lkjds');
        if (mutation.type === "childList") {
            mutation.addedNodes.forEach((node) => {
                if (
                    node.nodeType === 1 &&
                    node.tagName === "DIV" &&
                    node.id &&
                    node.id.startsWith("arc-srp")
                ) {
                    // console.log(
                    //     'New div element with id starting with "arc-srp_" added:',
                    //     node,
                    // );
                    // Do something with the new div element
                    const targetNode = document.getElementById("botstuff");

                    var at = targetNode.querySelectorAll("a[jsname]");

                    at.forEach((anchor) => {
                        // Do something with each anchor tag
                        // console.log(
                        //     "Anchor Href:",
                        //     anchor.getAttribute("href"),
                        // );
                    });

                    botstuffHrefList = getList(at);
                    updateAlpha();
                }
            });
        }
    }
};

function updateAlpha() {
    // body...

    removeSpanTag();
    const centerCol = document.getElementById("center_col");

    if (centerCol) {
        var aa = centerCol.querySelectorAll("a[jsname]");
        var allanchor = getList(aa);
    }
    if (!disableInCurrent) {
        everything();
        // alert('came here')
    }
}


// REMOVE ALPHANUMERIC SPANTAG WHEN UPDATING VALUES
function removeSpanTag() {
    // body...
    const spanElements = document.querySelectorAll(
        // 'span[style="font-size: 0.85em; font-weight: bolder; text-transform: uppercase;"]',
        'span[id="custom_alpha"]',
    )

    // Remove each selected span element
    if (spanElements) {
        spanElements.forEach((span) => {
            span.remove();
        });
    }
    setTimeout(() => {}, 1000);
}

function getList(list) {
    // body...
    var hrefList = Array.from(list)
        .map(function (a, index) {
            // console.log(a.innerText);
            // console.log(Object.keys(a));
            var hrefValue = a.getAttribute("href");

            // if (hrefValue === null || hrefValue === undefined || hrefValue === "#" ||  hrefValue.startsWith("/search")) {
            if (
                /^https:\/\//.test(hrefValue) &&
                !hrefValue.startsWith(
                    "https://support.google.com/websearch/answer/",
                ) &&
                !hrefValue.startsWith("https://maps.google.com/maps?sca_esv=")
            ) {
                return hrefValue;
            } else {
                return null; // Return null for invalid href values
            }
        })
        .filter(function (href) {
            return href !== null; // Filter out null values from the array
        });

    // console.log(hrefList);
    return hrefList;
}

const targetNode = document.getElementById("botstuff");

// Select the target node
// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for added nodes
if (targetNode) {
    observer.observe(targetNode, { childList: true, subtree: true });
}

// THROTTLE FUNCTION TO STOP OVERLOADING THE BROWSER
function throttle(func, delay) {
    let lastCallTime = 0;

    return function (...args) {
        const currentTime = new Date().getTime();

        if (currentTime - lastCallTime >= delay) {
            func.apply(this, args);
            lastCallTime = currentTime;
        }
    };
}

if (window.location.hostname === "www.google.com") {
    updateAlpha();
    const throttledScrollHandler = throttle(function () {
        console.log("Scrolled!");
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var scrollHeight = document.documentElement.scrollHeight;
        var clientHeight = document.documentElement.clientHeight;

        // Calculate the middle point
        var middlePoint = (scrollHeight - clientHeight) / 2;

        // Check if the scrollbar is scrolled to the middle
        if (scrollTop >= middlePoint) {
            console.log("Scrollbar is scrolled to the middle.");
            updateAlpha();
        }
    }, 2000); // Throttle to specified milliseconds

    // window.addEventListener("scroll", throttledScrollHandler);
}

const lowercaseAlphabets = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
];

// Storing multiple values
const dataToStore = {
    key1: "value1",
    key2: "value2",
    key3: "value3",
};

// chrome.storage.local.set(dataToStore, function() {
// console.log('Data saved');
// });

// chrome.storage.local.get("checkboxState", function(item){
//     alert("hel***************o",item.checkboxState);
//     // var checkbox = document.getElementById("setting2");
//     // checkbox.checked = true;
//     // alert(checkbox);

// })

function everything() {
    let checkbox = document.getElementById("setting2");
    let paaFrom;

    // chrome.storage.sync.get({ showPAA: false }, function (items) {
    //     paaFrom = items.showPAA;
    //     console.log("paa from 1", paaFrom); // Move the console.log inside the callback
    //     updateUI(paaFrom);
    // });

    // console.log("paa from ", paaFrom);

    // if (checkbox) {
    //     // Load the checkbox state from storage
    //     chrome.storage.sync.get({ showPAA: false }, function (items) {
    //         checkbox.checked = items.showPAA;
    //         console.log("showPAAValue:", checkbox.checked);
    //         paaFrom = checkbox.checked;
    //         // alert(checkbox.checked);
    //         // updateUI(checkbox.checked);
    //     });

    //     // Update storage when checkbox state changes
    //     checkbox.addEventListener("change", function () {
    //         const showPAA = checkbox.checked;

    //         // Save the checkbox state to storage
    //         chrome.storage.sync.set({ showPAA: showPAA }, function () {
    //             console.log("Checkbox state saved:", showPAA);
    //         });
    //     });
    // }

    // console.log("checkbox value -----------",checkbox.checked);

    if (window.location.hostname === "www.google.com") {
        // var paa = document.querySelectorAll('div[jsname][data-bs][data-sgrd]')

        var peopleAlsoAskDiv = document.querySelector(
            "div[jsname][data-bs][data-sgrd]",
        );

        var keyMomentsInVideo = document.querySelectorAll(
            "a[jsname][data-time]",
        );

        var imagesSection = document.querySelector("g-section-with-header");
        // var complementary = document.querySelector("div[role]");

        if (keyMomentsInVideo) {
            // console.log("keyMomentsInVideo:", keyMomentsInVideo);
            var keyMomentsList = getLinks(keyMomentsInVideo);
            // console.log("keyMomentsList: ", keyMomentsList);
        }

        if (imagesSection) {
            var imagesSectionAnchorTags = imagesSection.querySelectorAll("a");

            var imagesSectionLinks = getLinks(imagesSectionAnchorTags);
            // console.log(imagesSectionLinks);
        }
        // removeSection(peopleAlsoAskDiv);
        // removeSection(keyMomentsInVideo);
        // removeSection(imagesSection);

        // if (complementary && complementary === "complementary") {
        //     removeSection(complementary);
        // }

        function removeSection(section) {
            // body...
            if (section && section.parentNode) {
                section.parentNode.removeChild(section);
            } else {
                console.log("Element or parent not found.");
            }
        }

        var paalinks;

        if (peopleAlsoAskDiv) {
            paalinks = peopleAlsoAskDiv.querySelectorAll("a");

            paalinks = getLinks(paalinks);
        }
        // var paalinks = [];

        function getLinks(element) {
            if (element) {
                // Get all anchor tags within the div
                // var paalinks = element.querySelectorAll("a");

                return getList(element);
            }
        }

        var paaList = paalinks;
        var keyMomentsList = getLinks(keyMomentsInVideo);

        function uniqueVideoLinks(keyMomentsList) {
            // body...
            // Extract video IDs
            links = keyMomentsList;

            const cleanedLinks = links.map((link) => link.split("&")[0]);

            // Create a Set to keep only unique cleaned links
            const uniqueCleanedLinks = new Set(cleanedLinks);

            // console.log([...uniqueCleanedLinks]);
            return uniqueCleanedLinks;
        }

        var uniqueVL = uniqueVideoLinks(keyMomentsList);

        // if (keyMomentsList) {
        //     console.log("keyMomentsList: ", keyMomentsList);
        // }

        // var one = Array.from(paa).map(function (a, index) {
        // 	// console.log(a.innerText);
        // 	// console.log(Object.keys(a));

        //     var hrefValue = a.getAttribute('href');

        //     return hrefValue;
        // });
        // console.log(one)
        // var divs = document.querySelectorAll('div[data-bs][data-sgrd]');

        // console.log(divs)

        // var outerDiv = document.getElementById('outerDiv');

        //       // Array to store href values
        // var hrefs = [];

        // // Function to retrieve hrefs recursively from nested divs
        // function retrieveHrefsRecursive(element) {
        // // Select all anchor elements within the element
        // var anchors = element.querySelectorAll('a');

        // // Iterate over each anchor and retrieve the href
        // anchors.forEach(function(anchor) {
        //   var href = anchor.getAttribute('href');
        //   hrefs.push(href);
        // });

        // // Recursively call the function for each child div
        // var childDivs = element.querySelectorAll('div');
        // childDivs.forEach(function(childDiv) {
        //   retrieveHrefsRecursive(childDiv);
        // });
        // }

        // // Start the recursive retrieval from the outer div
        // retrieveHrefsRecursive(divs);

        // // Log or use the hrefs array as needed
        // console.log('All Hrefs:', hrefs);

        // console.log(paa);

        // var divs = document.querySelectorAll('div');

        // Array to store href values
        // var hrefs = [];

        // // Iterate over each div
        // divs.forEach(function(div) {
        // // Select all anchor elements within the div
        // var anchors = div.querySelectorAll('a');

        // // Iterate over each anchor and retrieve the href
        // anchors.forEach(function(anchor) {
        //   var href = anchor.getAttribute('href');
        //   hrefs.push(href);
        // });
        // });

        // console.log(divs);

        // var paaList = Array.from(paa).map(function(a) {
        // 	var a = a.getAttribute('a');

        // 	var hrefValue = a.getAttribute('href')
        // 	// body...
        // 	console.log(hrefValue)
        // });
        // console.log(paaList);

        // #### Extract href attribute from selected anchor tags
        function getHrefList() {
            var center_col = document.getElementById("center_col");
            var anchorTags = center_col.querySelectorAll("a[jsname]");
            // console.log("anchor tags", anchorTags);
            if (anchorTags) {
                var hrefList = Array.from(anchorTags)
                .map(function (a, index) {
                    // console.log(a.innerText);
                    // console.log(Object.keys(a));
                    var hrefValue = a.getAttribute("href");
                    // console.log(hrefValue);
                    // if (hrefValue === null || hrefValue === undefined || hrefValue === "#" ||  hrefValue.startsWith("/search")) {
                    if (
                        /^https:\/\//.test(hrefValue) &&
                        !hrefValue.startsWith(
                            "https://support.google.com/websearch/answer/",
                        ) &&
                        !hrefValue.startsWith(
                            "https://maps.google.com/maps?sca_esv=",
                        )
                    ) {
                        return hrefValue;
                    } else {
                        // console.log('none');
                        return null; // Return null for invalid href values
                    }
                })
                .filter(function (href) {
                    return href !== null; // Filter out null values from the array
                });
            // console.log("href list", hrefList);
                 return hrefList;
            }
        }
        var hrefList = getHrefList();
        var setting1;

        console.log(hrefList);
        // console.log(setting1);

        var filteredLinks;
        // alert(isPaachecked);
        function getFilteredLinks() {
            // Remove links that match links in the linksToRemove array
            filteredLinks = hrefList.filter(function (link) {
                if (one) {
                    if (paaList && paaList.includes(link)) {
                        // console.log("removing paa section", paaFrom);
                        return true; // Exclude links that are in paaList
                    }
                } else {
                    // if (paaList.includes(link) === hrefList.includes(link) ){
                    //     return true;
                    // }

                    // if (paaList && paaList.includes(link) && hrefList.includes(link) && !paaFrom) {
                    // console.log('removing paa section', paaFrom)
                    // return false; // Exclude links that are in paaList
                    // }

                    if (paaList && paaList.includes(link)) {
                        // console.log("removing paa section", paaFrom);
                        return false; // Exclude links that are in paaList
                    }
                }

                if (keyMomentsList && keyMomentsList.includes(link)) {
                    return false;
                    if (setting1) {
                        // console.log("true");
                        return false;
                    } else {
                        // console.log("false");
                        return false; // Exclude links that are in keyMomentsList
                    }
                }

                if (imagesSectionLinks && imagesSectionLinks.includes(link)) {
                    return true;
                }

                // Include links that are not in either paaList or keyMomentsList
                return true;
            });

            // Log the filtered links
            // console.log("Filtered Links:", filteredLinks);
            filteredLinks.push(...uniqueVL);
            // console.log(filteredLinks);
            var center_col = document.getElementById("center_col");
            if (center_col) {
                for (let i = 0; i < filteredLinks.length; i++) {
                    // console.log(scores[i]);
                    // console.log(i);
                    targetHref = filteredLinks[i];
                    // Find anchor elements with the specified href
                    var targetElements = center_col.querySelectorAll(
                        'a[href="' + targetHref + '"]',
                    );
                    var divInsideSpan;
                    // console.log("dict", i + "  " + targetElements);
                    if (targetElements) {
                        // var imageElement = targetElements.querySelector("img");

                        // console.log(imageElement);

                        // var imgHtml = new XMLSerializer().serializeToString(imageElement);
                        var spanTag = document.createElement("span");
                        // spanTag.setAttribute("style", "font-size: 0.85em;");
                        // spanTag.setAttribute("style", "font-size: 0.85em;    align-items: center;background-color: #f4f6f7;border-radius: 100px;    display: inline-flex; margin-left:8px;   margin-right: 12px;  padding: 4px 16px 4px 8px");
                        spanTag.setAttribute("id", "custom_alpha");
                        // spanTag.style.fontWeight = "bolder";
                        spanTag.style.fontWeight = "inherit";
                        spanTag.style.textTransform = 'uppercase';

                        if (i >= 10) {
                            spanTag.innerText =
                                " \u25B8 " + lowercaseAlphabets[i - 10] + " ";
                                // lowercaseAlphabets[i - 10] + " ";
                        } else {
                            spanTag.innerText = " \u25B8 " + i + " \u0020";
                            // spanTag.innerText = i + " ";
                        }
                        // Set the innerHTML of the target element to display the image
                        // targetElements.innerHTML = imgHtml +  " " + i + " " + targetElements.innerText;
                        for (target of targetElements) {
                            if (target.querySelector("g-img")) {
                                targetHeading = target
                                    .querySelector("g-img")
                                    .parentNode.querySelector("span");
                                // console.log(targetHeading);
                            } else {
                                targetHeading = target.querySelector("h3");
                                // if (targetHeading) {
                                    // console.log(
                                    //     targetHeading.parentNode.parentNode.querySelector(
                                    //         "span",
                                    //     ),
                                    // );
                                    // targetHeading =
                                        // targetHeading.parentElement.parentElement.querySelectorAll(
                                        //     "div",
                                        // );
                                    // console.log("x: number")
                                    //CODE FOR H3
                                    // targetHeading = targetHeading.parentElement.parentElement.parentElement.parentElement.querySelectorAll("h3")

                                    // targetHeading = targetHeading.parentElement.parentElement.querySelector("h3")
                                    // targetHeading = targetHeading.parentElement.parentElement.querySelectorAll("h3")

                                    // divInsideSpan = targetHeading[targetHeading.length - 1]; // Get the last <div> in the NodeList

                                // }
                            }

                            if (targetHeading) {
                                // targetHeading = targetHeading.querySelector("span");
                                // targetHeading.prepend(spanTag);

                                //CODE FOR H3
                                if (targetHeading[0] != undefined){
                                    targetHeading[0].append(spanTag)
                                }else {
                                    // targetHeading.prepend(spanTag)
                                    targetHeading.append(spanTag)
                                }

                            }
                        }
                        // targetElements.innerHTML =    i + " " + targetElements.innerText ;

                        // targetElements.innerText = i + " " + imageElement
                        // targetElements.innerText = targetElements.appendChild(imageElement) + " " + i + " " + targetElements.innerText;

                        // if (i === 0 && targetElements !== undefined) {
                        //     targetElements.style.border = "2px solid red";
                        // }
                    }

                    replacementText = i + " " + targetHref;
                    // Replace text content in each matching element
                }
            }
        }

        getFilteredLinks();
    }
    // all();

    function updateUI(showPAA) {
        // Your UI update logic here
        // console.log("Updating UI based on showPAA:", showPAA);
        paaFrom = showPAA;
        // getFilteredLinks();
        updateAlpha();
    }
    // for (var i = 0, l = hrefList.length; i < l; i++) {
    // var els = document.querySelectorAll("a[href^='" + hrefList[0] + "']");

    // var el = els;
    // el.innerHTML = "helow";
    // collection[0].innerHTML = "Hello World!";
    // }

    // for (var i = 0, l = hrefList.length; i < l; i++) {
    //     var els = document.querySelectorAll("a[href^='" + hrefList[i] + "']");

    //   var el = els[i];
    //   el.innerHTML = el.innerHTML.replace(/link/gi, 'dead link');
    // }
    // };

    function simulateArrowDown() {
        // Create a new key down event for the arrow down key
        var arrowDownEvent = new KeyboardEvent("keydown", {
            key: "ArrowDown",
            keyCode: 40,
            which: 40,
            code: "ArrowDown",
        });

        // Dispatch the event on the input element
        document.dispatchEvent(arrowDownEvent);
    }

    // document.getElementById("setting2").addEventListener("input", function () {
    //       chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //           chrome.tabs.sendMessage(tabs[0].id, { action: "paa" });
    //           console.log("jlsdkj");
    //           alert('one')
    //       });
    //   });
    let currentIndex = -1; // To track the current highlighted suggestion

    function handleKeyDown(event) {
        const pressedKey = String.fromCharCode(event.keyCode);

        var activeElement = document.activeElement;

        var input_fields = ["textarea", "input"];
        var ulbox=document.querySelectorAll('li[role="presentation"]');

        if (
            event.ctrlKey &&
            (event.key === "Minus" || event.code === "Minus")
        ) {
            // Your code to handle Ctrl and Minus key pressed together
            console.log("Ctrl and Minus keys pressed together");
        }

        if (input_fields.includes(activeElement.tagName.toLowerCase())) {
            console.log("Cursor is in an input field.");
                // const textarea = document.querySelector('textarea');
                if (activeElement.tagName.toLowerCase() === "textarea" && window.location.hostname === "www.google.com") {
                    if (event.ctrlKey && event.key === "n"){


                    if (activeElement.hasAttribute('aria-expanded') && activeElement.getAttribute('aria-expanded') === 'true') {
                        // alert('Textarea has data-enabled attribute set to true.');
                        ulbox = document.querySelectorAll('li[role="presentation"]')
                        if (ulbox != undefined){
                            currentIndex = currentIndex + 1
                            var newbox = ''
                            ulbox.forEach(child =>
                            {
                                child.style.backgroundColor = '';
                                newbox += child.tagName + " \n"
                            })
                            ulbox[currentIndex].style.backgroundColor = 'yellow';
                        }
                    } else {
                        alert('Textarea does not have data-enabled attribute set to true.');
                    }

                }
                 if (event.key === "Enter"){
                                event.preventDefault(); // Prevent new line in textarea
                                // Get the selected suggestion
                                const selectedSuggestion = ulbox[currentIndex];
                                if (selectedSuggestion) {
                                    // const searchURL = `https://www.google.com/search?q=${encodeURIComponent(selectedSuggestion)}`;
                                    // window.location.href = searchURL; // Navigate to the search URL

                                    activeElement.value += selectedSuggestion.textContent + ' '; // Add a space after
                                    selectedSuggestion.click();
                                    currentIndex = -1; // Reset index after selection
                                }
                            }


            }
            // console.dir(activeElement);
        } else {
            // console.log("Cursor is not in an input field. " + event.key);
            if (
                (event.metaKey || event.ctrlKey || event.altKey) &&
                /^\d$/.test(event.key)
                // (event.metaKey || event.ctrlKey || event.altKey) && (pressedKey >= 'a' && pressedKey <= 'z')
            ) {
                console.log("Cmd or Ctrl + Number key combination allowed.");
            } else if (
                !event.shiftKey && // disable triggering shift + key commands while textarea in focus
                !input_fields.includes(activeElement.tagName.toLowerCase()) && // " "
                event.keyCode >= 48 &&
                event.keyCode <= 57 &&
                // (event.keyCode >= 65 &&event.keyCode <= 73 ) &&
                window.location.hostname === "www.google.com"
            ) {
                // Run your function here
                // event.preventDefault();
                // console.log(
                //     "Pressed key is a number:",
                //     pressedKey + "\n" + filteredLinks[pressedKey],
                // );
                // Replace the following line with your custom function
                // alert('Pressed key is a number: ' + pressedKey + hrefList[pressedKey]);
                window.location.href = filteredLinks[pressedKey];
            } else if (
                !event.metaKey &&
                !event.shiftKey && // disable triggering shift + key commands while textarea in focus
                !input_fields.includes(activeElement.tagName.toLowerCase()) && // " "
                event.keyCode >= 65 &&
                event.keyCode <= 90 &&
                window.location.hostname === "www.google.com" &&
                !(event.shiftKey && event.key === "G")
            ) {
                if (filteredLinks[event.keyCode - 55] && filteredLinks.length <= 18 && isJkwz ) {
                    window.location.href = filteredLinks[event.keyCode - 55];
                } 
                else if (filteredLinks.length >= 18 && isJkwz) {
                    alert("jk/wz will not work in this particular page");
                }
            }
            if (event.shiftKey && event.key === "G") {
                // scrolls to top when shift + G is pressed
                window.scrollTo(0, 0);
            }

            // GOTO NEXT PAGE IN GOOGLE PAGINATION
            if (event.shiftKey && event.key === ">") {
               // 1. Get the div element with role="navigation"
              const anchorElement = document.getElementById('pnnext');
              if (anchorElement) {
                  window.location.href = anchorElement.href;
              }
            }

            // GOTO PREVIOUS PAGE IN GOOGLE PAGINATION
            if (event.shiftKey && event.key === "<") {
               // 1. Get the div element with role="navigation"
              const anchorElement = document.getElementById('pnprev');
              if (anchorElement) {
                  window.location.href = anchorElement.href;
              }
            }
            isOpening = false;
            if (event.shiftKey && event.key === "N" && !isOpening) {
                isOpening = true; // Set the flag to true

                // Get the current URL
                const url = window.location.href;

                // Create a URL object
                const currentUrl = new URL(url);

                // Extract the domain name
                const domainName = `${currentUrl.protocol}//${currentUrl.hostname}`;
                
                // Open the new window
                window.open(domainName, '_blank');

                // Reset the flag after a short timeout
                setTimeout(() => {
                    isOpening = false;
                }, 500); // Adjust the timeout as needed
            }
        }
   }

    // window.addEventListener('scroll', function() {
    //   // Get the current vertical scroll position
    //   var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    //   // Get the total height of the document, including scrollable area
    //   var totalHeight = document.documentElement.scrollHeight;

    //   // Get the height of the viewport
    //   var windowHeight = window.innerHeight;

    //   // Check if the user has scrolled to the bottom
    //   if (scrollTop + windowHeight >= totalHeight) {
    //     console.log('Scrolled to the bottom!');
    //   }
    // });

    // document.addEventListener('keydown', function(event) {

    // });

    // Add the keydown event listener to the document
    document.addEventListener("keydown", handleKeyDown);

    // content.js

    // https://playwright.dev › docs › locators

    // console.log(citeData);

    // console.log(hrefList);

    // obsolite code
    // var anchorTags = document.querySelectorAll('cite[role]');

    // var citeList = Array.from(anchorTags).map(function (a) {
    // 	console.log(a.innerText)
    // 	cite_text = a.innerText

    // 	if (cite_text.startsWith("https://") ) {

    // 		return cite_text;

    // 	}
    // 	else{
    // 		console.log('none');
    // 		return null;
    // 	}
    // }).filter(function (href) {
    //     return href !== null; // Filter out null values from the array
    // });
}
// getFilteredLinks();

window.onscroll = function () {
    // Check if the user has scrolled to the bottom
    // console.log("scrolling start");
    if (isPageScrolledToBottom()) {
        console.log("Scrolled to the bottom!");
        // Add your code to handle reaching the bottom of the page
    }
};
// console.dir(window);
updateAlpha();

// window.onloadeddata = function () {
//     updateAlpha();
//     alert("coming here");
// };
// window.onloadstart = function () {
//     updateAlpha();
//     alert("coming here");
// };
// window.onreload = function () {
//     updateAlpha();
//     alert("coming here");
// };
// window.load = function () {
//     updateAlpha();
//     alert("coming here");
// };
window.addEventListener("popstate", function (event) {
    // Handle the popstate event here
    updateAlpha();
    // alert("coming here");

    console.log("Popstate event triggered");
    console.log("State:", event.state);
    console.log("Location:", document.location.href);
});
function isPageScrolledToBottom() {
    // Calculate the current scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Calculate the total height of the page
    const totalHeight = document.documentElement.scrollHeight;

    // Calculate the height of the viewport
    const windowHeight = window.innerHeight;

    // Check if the user has scrolled to the bottom
    return scrollTop + windowHeight >= totalHeight;
}

// Load the tab history from local storage on extension startup
chrome.storage.local.get(["tabHistory"], function (result) {
    if (result.tabHistory) {
        tabHistory = result.tabHistory;
        // console.log("Tab history loaded from local storage:", tabHistory);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            // if (message.action === "getURL") {
            //     sendResponse({ url: mainWeb });
            // }

            if (request.action === "extractCiteData") {
                // Extract cite data from Google search results
                var citeElements = document.querySelectorAll(".tF2Cxc cite"); // Adjust the selector based on the current Google search result page structure

                var citeData = Array.from(citeElements).map(function (cite) {
                    return cite.innerText.trim(); // Trim to remove leading/trailing whitespaces
                });

                // Remove empty items from citeData
                citeData = citeData.filter(function (item) {
                    return item !== "";
                });

                // Extract proper URLs from citeData
                var urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i; // Basic URL regex
                var validUrls = citeData.filter(function (item) {
                    return urlRegex.test(item);
                });

                // Log or do something with the extracted valid URLs
                // console.log("Valid URLs:", validUrls);
            }
        },
    );
});
