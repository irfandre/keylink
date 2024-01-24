// content.js
// alert("Content script loaded!");

var anchorTags = document.querySelectorAll('a[jsname]');
var optimizedList;
console.log(anchorTags);
// Extract href attribute from selected anchor tags
var hrefList = Array.from(anchorTags).map(function (a) {
    var hrefValue = a.getAttribute('href');

    // if (hrefValue === null || hrefValue === undefined || hrefValue === "#" ||  hrefValue.startsWith("/search")) {
    if (/^https:\/\//.test(hrefValue) && !hrefValue.startsWith("https://support.google.com/websearch/answer/") && !hrefValue.startsWith("https://maps.google.com/maps?sca_esv=") ) {

    	// !hrefValue.startsWith("https://maps.google.com/maps?sca_esv=")
    	return hrefValue;
        
    } else {
    	console.log('none');
        return null; // Return null for invalid href values
        
    }
}).filter(function (href) {
    return href !== null; // Filter out null values from the array
});


// for (var i = 0, l = hrefList.length; i < l; i++) {
var els = document.querySelectorAll("a[href^='" + hrefList[1] + "']");

var el = els;
el.innerHTML = "helow";
// collection[0].innerHTML = "Hello World!";
// }


// for (var i = 0, l = hrefList.length; i < l; i++) {
//     var els = document.querySelectorAll("a[href^='" + hrefList[i] + "']");

//   var el = els[i];
//   el.innerHTML = el.innerHTML.replace(/link/gi, 'dead link');
// }

function handleKeyDown(event) {
  const pressedKey = String.fromCharCode(event.keyCode);
  // alert(pressedKey);
  // Check if the pressed key is a number
  if (event.keyCode >= 48 && event.keyCode <= 57) {
    // Run your function here
    console.log('Pressed key is a number:', pressedKey + "\n" + hrefList[pressedKey]);
    // Replace the following line with your custom function
    // alert('Pressed key is a number: ' + pressedKey + hrefList[pressedKey]);
    window.location.href = hrefList[pressedKey];
  }
  // Prevent default action for the space key (key code 32)
  if (event.keyCode === 32) {
    // event.preventDefault();
  }
}

// Add the keydown event listener to the document
document.addEventListener('keydown', handleKeyDown);

console.log(hrefList);