// content.js
// alert("Content script loaded!");
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

const downArrowEvent = new KeyboardEvent("keydown", {
    key: "ArrowDown",
    code: "ArrowDown",
    keyCode: 40,
    which: 40,
    // Add other properties as needed
});

window.onload = function () {
    if (window.location.hostname === "www.google.com") {
        // var paa = document.querySelectorAll('div[jsname][data-bs][data-sgrd]')


        var peopleAlsoAskDiv = document.querySelector(
            "div[jsname][data-bs][data-sgrd]",
        );

        

        var keyMomentsInVideo = document.querySelectorAll(
            "a[jsname][data-time]",
        );

        var imagesSection = document.querySelector("g-section-with-header");


        if (keyMomentsInVideo) {
            console.log("keyMomentsInVideo:", keyMomentsInVideo);
            var keyMomentsList = getLinks(keyMomentsInVideo);
            console.log("keyMomentsList: ", keyMomentsList);
        }

        if (imagesSection) {
          var imagesSectionAnchorTags = imagesSection.querySelectorAll("a");

          var imagesSectionLinks = getLinks(imagesSectionAnchorTags);
          console.log(imagesSectionLinks)
        }
        removeSection(peopleAlsoAskDiv);
        removeSection(keyMomentsInVideo);
        removeSection(imagesSection);

        function removeSection(section) {

          // body...
          if (section && section.parentNode) {
                section.parentNode.removeChild(section);
              } else {
                console.log('Element or parent not found.');
              }
        }

        var paalinks

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
                        !hrefValue.startsWith(
                            "https://maps.google.com/maps?sca_esv=",
                        )
                    ) {
                        return hrefValue;
                    } else {
                        return null; // Return null for invalid href values
                    }
                })
                .filter(function (href) {
                    return href !== null; // Filter out null values from the array
                });

            console.log(hrefList);
            return hrefList;
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

            console.log([...uniqueCleanedLinks]);
            return uniqueCleanedLinks;
        }

        var uniqueVL = uniqueVideoLinks(keyMomentsList);

        if (keyMomentsList) {
            console.log("keyMomentsList: ", keyMomentsList);
        }

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
        var anchorTags = document.querySelectorAll("a[jsname]");
        console.log(anchorTags);

        var hrefList = Array.from(anchorTags)
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

        // Remove links that match links in the linksToRemove array
        var filteredLinks = hrefList.filter(function (link) {
            if (paaList && paaList.includes(link)) {
                return true; // Exclude links that are in paaList
            }

            if (keyMomentsList && keyMomentsList.includes(link)) {
                return true; // Exclude links that are in keyMomentsList
            }

            if (imagesSectionLinks && imagesSectionLinks.includes(link)) {
                return true;
            }

            // Include links that are not in either paaList or keyMomentsList
            return true;
        });

        // Log the filtered links
        console.log("Filtered Links:", filteredLinks);
        filteredLinks.push(...uniqueVL);
        console.log(filteredLinks);

        for (let i = 0; i < filteredLinks.length; i++) {
            // console.log(scores[i]);
            targetHref = filteredLinks[i];
            // Find anchor elements with the specified href
            var targetElements = document.querySelector(
                'a[href="' + targetHref + '"]',
            );

            console.log("dict", i + "  " + targetElements);
            if (targetElements) {
                var imageElement = targetElements.querySelector("img");

                console.log(imageElement);

                // var imgHtml = new XMLSerializer().serializeToString(imageElement);
                var aTag = document.createElement("span");
                aTag.setAttribute("style", "font-size:1.5vw");
                if (i >= 10) {
                    aTag.innerText = " " + lowercaseAlphabets[i - 10] + " ";
                } else {
                    aTag.innerText = " " + i + " ";
                }
                // Set the innerHTML of the target element to display the image
                // targetElements.innerHTML = imgHtml +  " " + i + " " + targetElements.innerText;
                targetElements = targetElements.append(aTag);
                // targetElements.innerHTML =    i + " " + targetElements.innerText ;

                // targetElements.innerText = i + " " + imageElement
                // targetElements.innerText = targetElements.appendChild(imageElement) + " " + i + " " + targetElements.innerText;

                if (i === 0 && targetElements !== undefined) {
                    targetElements.style.border = "2px solid red";
                }
            }

            replacementText = i + " " + targetHref;
            // Replace text content in each matching element
        }
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

    var input_fields = ["textarea", "input"];

    if (event.ctrlKey && (event.key === "Minus" || event.code === "Minus")) {
        // Your code to handle Ctrl and Minus key pressed together
        console.log("Ctrl and Minus keys pressed together");
    }

    

    if (input_fields.includes(activeElement.tagName.toLowerCase())) {
        console.log("Cursor is in an input field.");
        console.dir(activeElement);
    } else {
        console.log("Cursor is not in an input field. " + event.key);
        if (
          ((event.metaKey || event.ctrlKey || event.altKey) && /^\d$/.test(event.key) )
          // (event.metaKey || event.ctrlKey || event.altKey) && (pressedKey >= 'a' && pressedKey <= 'z') 
          ) {
            console.log("Cmd or Ctrl + Number key combination allowed.");
          } else if (
            event.keyCode >= 48 &&
            event.keyCode <= 57 &&
            // (event.keyCode >= 65 &&event.keyCode <= 73 ) &&
            window.location.hostname === "www.google.com"
        ) {
            // Run your function here
            // event.preventDefault();
            console.log(
                "Pressed key is a number:",
                pressedKey + "\n" + filteredLinks[pressedKey],
            );
            // Replace the following line with your custom function
            // alert('Pressed key is a number: ' + pressedKey + hrefList[pressedKey]);
            window.location.href = filteredLinks[pressedKey];
        } else if (
            (!event.metaKey && event.keyCode >= 65 && event.keyCode <= 73) ||
            (!event.metaKey && event.keyCode >= 76 &&
                event.keyCode <= 90 &&
                window.location.hostname === "www.google.com")
        ) {
            window.location.href = filteredLinks[event.keyCode - 55];
        }

        if ((event.metaKey || event.ctrlKey) && event.key <= 1) {
            // event.preventDefault();
            console.log("a pressed");
        }
        // Prevent default action for the space key (key code 32)
        if (event.keyCode === 32) {
            // event.preventDefault();
        }
        if (event.keyCode === 74) {
            // event.preventDefault();
            // window.location.href = hrefList[1];
        }

        // Check if the pressed key is 'j'
        if (event.key !== undefined) {
            if (
                event.key.toLowerCase() === "j" &&
                window.location.hostname !== "www.youtube.com"
            ) {
                // Create a new keyboard event for the down arrow key
                window.scrollBy(0, 100);
                document.dispatchEvent(downArrowEvent);
            } else if (
                event.key.toLowerCase() === "k" &&
                window.location.hostname !== "www.youtube.com"
            ) {
                window.scrollBy(0, -100);
            }
        }
    }
}

// document.addEventListener('keydown', function(event) {

// });

// Add the keydown event listener to the document
document.addEventListener("keydown", handleKeyDown);

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
};

window.onscroll = function() {
  // Check if the user has scrolled to the bottom
  console.log('scrolling start');
  if (isPageScrolledToBottom()) {
    console.log('Scrolled to the bottom!');
    // Add your code to handle reaching the bottom of the page
  }
};

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
