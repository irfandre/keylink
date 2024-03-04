// popup.js
async function getCheckboxState() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("checkboxState", function (data) {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(data.checkboxState || false);
            }
        });
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.url) {
    console.log("Tab URL:", message.url);
  }
});


// Function to set checkbox state in local storage
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

function onPopupOpened() {
    console.log("Popup opened");
    // Your code here
    // alert("opened")
    var checkbox = document.getElementById("setting2");

    (async () => {
        checkbox.checked = await getCheckboxState();
        // paaPaa = checkbox.checked;
        // alert("paa is checked ", paaPaa);
        checkbox.checked = await getCheckboxState();
    })();
}

// Attach the function to the event listener
document.addEventListener("DOMContentLoaded", onPopupOpened);

// document.addEventListener("DOMContentLoaded", function () {
//     // Button 1 click event

//     //   var setting1 = document.getElementById('setting1').addEventListener('input', function() {
//     //   console.log('Button 1 clicked!');
//     //   // Add your code for Button 1 click event
//     //   alert('jlskdj');
//     // });
//     // document
//     //     .getElementById("setting1")
//     //     .addEventListener("input", handleSetting1Input);

//     // Button 2 click event

//     var checkbox = document.getElementById("setting2");
//     // alert(paa)
//     // paa.addEventListener("input", function () {
//     //     console.log("Button 2 clicked!");
//     //     // Add your code for Button 2 click event
//     // });

//     function onPopupOpened() {
//         console.log('Popup opened');
//         // Your code here
//       }

//       // Call the function when the popup is opened
//     onPopupOpened();

//     (async () => {
//       checkbox.checked = await getCheckboxState();
//       // paaPaa = checkbox.checked;
//       // alert("paa is checked ", paaPaa);
//     })();

// });

// document.getElementById('setting1').addEventListener('input', function() {
//     console.log('Button 1 clicked!');
//     // Add your code for Button 1 click event
//     alert('jlskdj');
//   });

// document
//   .getElementById("setting2")
//   .addEventListener("input", function () {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, { action: "paa" });
//       console.log('2')
//     });
//   });
