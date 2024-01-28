// popup.js
// document
//   .getElementById("extractCiteButton")
//   .addEventListener("click", function () {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, { action: "extractCiteData" });
//     });
//   });


document.addEventListener('DOMContentLoaded', function() {
  // Button 1 click event
  document.getElementById('setting1').addEventListener('input', function() {
    console.log('Button 1 clicked!');
    // Add your code for Button 1 click event
    alert('jlskdj');
  });

  // Button 2 click event
  document.getElementById('setting2').addEventListener('input', function() {
    console.log('Button 2 clicked!');
    // Add your code for Button 2 click event
  });
});