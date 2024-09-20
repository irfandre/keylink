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

const powerBtn = document.getElementById("power");
const powerIcon = document.querySelector(".power-icon");

// powerBtn.addEventListener("change", () => {
//     if (powerBtn.checked) {
//         powerIcon.style.opacity = 0;
//         alert("message?: DOMString");
//         // alternativeIcon.style.opacity = 1;
//     } else {
//         powerIcon.style.opacity = 1;
//         // alternativeIcon.style.opacity = 0;
//     }
// });

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
         try {
              checkbox.checked = await getCheckboxState();
            } catch (error) {
              console.error("Failed to get checkbox state:", error);
            }

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
document.getElementById('toggleButton').addEventListener('click', () => {
  // chrome.runtime.sendMessage({ action: "showAlert" });
      alert('Button clicked!');

});


document.addEventListener('DOMContentLoaded', onPopupOpened);

function onPopupOpened() {
  console.log("Popup opened");

  document.getElementById('disableButton').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.storage.local.set({ [tabs[0].id]: { disabled: true } }, function() {
        console.log('Extension disabled for tab ' + tabs[0].id);
      });
    });
  });

  // Define the list of switch IDs
  const switchIds = ['setting1', 'setting2'];

  // Load states for all switches
  (async () => {
    try {
      const states = await getSwitchStates(switchIds);
      switchIds.forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
          checkbox.checked = states[id] || false; // Default to false if not set
        }
      });
    } catch (error) {
      console.error("Failed to get switch states:", error);
    }
  })();

  // Add event listeners to save state on change
  switchIds.forEach(id => {
    const checkbox = document.getElementById(id);
    if (checkbox) {
      checkbox.addEventListener('change', async function() {
        try {
          await saveSwitchState(id, checkbox.checked);
        } catch (error) {
          console.error(`Failed to save state for ${id}:`, error);
        }
      });
    }
  });
}

async function getSwitchStates(ids) {
  return new Promise((resolve) => {
    chrome.storage.local.get(ids, function(result) {
      resolve(result);
    });
  });
}

async function saveSwitchState(id, state) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [id]: state }, function() {
      resolve();
    });
  });
}


