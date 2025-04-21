function fetchJSONP(url) {
  return new Promise((resolve, reject) => {
    // Create a unique callback function name
    let callbackName = "jsonp_callback_" + Math.round(100000 * Math.random());

    // Create a new script element
    let script = document.createElement("script");

    // Define the callback function on the window object
    window[callbackName] = function (data) {
      delete window[callbackName];
      document.head.removeChild(script);
      resolve(data);
    };

    // Set the source of the newly added script element and handle errors
    script.src =
      url +
      (url.indexOf("?") >= 0 ? "&" : "?") +
      "jsoncallback=" +
      callbackName;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

let allFunctions = function () {
  "use strict";

  // make use of JSONP to do cross domain retrieval
  let getPhotosFromFlickr = function (mySearchTags) {
    let requestURL = "https://api.flickr.com/services/feeds/photos_public.gne?";

    fetchJSONP(
      requestURL + "tags=" + mySearchTags + "&format=json&tagmode=all"
    ).then(
      // the (arrow) function to execute when the result set comes in from Flickr
      (result) => {
        if (typeof result.items !== "undefined" && result.items.length > 0) {
          result.items.forEach(function (item) {
            console.info(item);
            var img = document.createElement("img");
            img.src = item.media.m;
            document.querySelector("main .photos").appendChild(img);
          });
        } else {
          document.querySelector("main .messages").textContent =
            "No results found";
        }
      }
    );
  };

  // when the user clicks the button, or presses enter in the
  // input field the searchFromInput function is invoked
  let searchFromInput = function () {
    let mySearchTags = document.querySelector("section#flickr input").value;

    if (mySearchTags !== "") {
      document.querySelector("main .photos").innerHTML = "";
      document.querySelector("main .messages").innerHTML = "";
      getPhotosFromFlickr(mySearchTags);
    } else {
      // alert('Enter one or more search words');
      document.querySelector("main .messages").textContent =
        "Enter one or more search words";
    }
  };

  // attach event listeners to both the button and the input
  document
    .querySelector("section#flickr button")
    .addEventListener("click", function (event) {
      searchFromInput();
    });

  document
    .querySelector("section#flickr input")
    .addEventListener("keypress", function (event) {
      if (event.keyCode === 13) {
        searchFromInput();
      }
    });
};

// when the page is fully loaded/ready, call allFunctions
document.addEventListener("DOMContentLoaded", allFunctions);
