// content.js
// alert("Content script loaded!");
var count = 0;
var anchorTags = document.querySelectorAll('a[jsname]');
// var anchorTags = document.querySelectorAll('cite[role]');


var optimizedList;
// console.log(anchorTags);

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


// Extract href attribute from selected anchor tags
var hrefList = Array.from(anchorTags).map(function (a, index) {
	// console.log(a.innerText);
	// console.log(Object.keys(a));
    var hrefValue = a.getAttribute('href');

    // if (hrefValue === null || hrefValue === undefined || hrefValue === "#" ||  hrefValue.startsWith("/search")) {
    if (/^https:\/\//.test(hrefValue) && !hrefValue.startsWith("https://support.google.com/websearch/answer/") && !hrefValue.startsWith("https://maps.google.com/maps?sca_esv=") ) {

    	// !hrefValue.startsWith("https://maps.google.com/maps?sca_esv=")


    	return hrefValue;
        
    } else {
    	// console.log('none');
        return null; // Return null for invalid href values
        
    }
}).filter(function (href) {
    return href !== null; // Filter out null values from the array
});


for (let i = 0; i < hrefList.length; i++) {
    // console.log(scores[i]);
    targetHref = hrefList[i];
		  // Find anchor elements with the specified href
	var targetElements = document.querySelector('a[href="' + targetHref + '"]');

	console.log(targetElements)
	if (targetElements) {
		var imageElement = targetElements.querySelector('img');
		console.log(imageElement);

		// var imgHtml = new XMLSerializer().serializeToString(imageElement);
		var aTag = document.createElement('span');
		aTag.setAttribute('style',"font-size:1.5vw");
		aTag.innerText = " " + i + " ";
        // Set the innerHTML of the target element to display the image
        // targetElements.innerHTML = imgHtml +  " " + i + " " + targetElements.innerText;
        targetElements = targetElements.append(aTag)
        // targetElements.innerHTML =    i + " " + targetElements.innerText ;

		// targetElements.innerText = i + " " + imageElement
	  	// targetElements.innerText = targetElements.appendChild(imageElement) + " " + i + " " + targetElements.innerText;


	}

	replacementText = i + " " + targetHref;
	// Replace text content in each matching element
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

function handleKeyDown(event) {
  const pressedKey = String.fromCharCode(event.keyCode);
  console.log(pressedKey);
  // alert(pressedKey);
  
  // Check if the pressed key is a number

//   window.onkeydown = function(e){
//   if ( e.target.nodeName == 'INPUT' ) return;

//   handle_shortcut();
// };

  var activeElement = document.activeElement;

  if (activeElement.tagName.toLowerCase() === 'textarea') {
    console.log('Cursor is in an input field.');
  } else {

    console.log('Cursor is not in an input field.');
			if ((event.metaKey || event.ctrlKey) && /^\d$/.test(event.key)) {
			console.log('Cmd or Ctrl + Number key combination allowed.');
			} else if (event.keyCode >= 48 && event.keyCode <= 57) {
				    // Run your function here
				    // event.preventDefault();
				    console.log('Pressed key is a number:', pressedKey + "\n" + hrefList[pressedKey]);
				    // Replace the following line with your custom function
				    // alert('Pressed key is a number: ' + pressedKey + hrefList[pressedKey]);
				    window.location.href = hrefList[pressedKey];
						}

			if ((event.metaKey || event.ctrlKey) && event.key <= 1) {
				// event.preventDefault();	
				console.log('a pressed')
			}
			// Prevent default action for the space key (key code 32)
			if (event.keyCode === 32) {
			// event.preventDefault();
			}
			if (event.keyCode === 74) {
			// event.preventDefault();
			window.location.href = hrefList[1];

			}
  }

  
}




// Add the keydown event listener to the document
document.addEventListener('keydown', handleKeyDown);

// content.js
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.action === 'extractCiteData') {
//     // Extract cite data from Google search results
//     var citeElements = document.querySelectorAll('.tF2Cxc cite'); // Adjust the selector based on the current Google search result page structure

//     var citeData = Array.from(citeElements).map(function(cite) {
//       return cite.innerText.trim(); // Trim to remove leading/trailing whitespaces
//     });

//     // Remove empty items from citeData
//     citeData = citeData.filter(function(item) {
//       return item !== '';
//     });

//     // Extract proper URLs from citeData
//     var urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i; // Basic URL regex
//     var validUrls = citeData.filter(function(item) {
//       return urlRegex.test(item);
//     });

//     // Log or do something with the extracted valid URLs
//     console.log('Valid URLs:', validUrls);
//   }
// });


// https://playwright.dev › docs › locators


// console.log(citeData);



console.log(hrefList);