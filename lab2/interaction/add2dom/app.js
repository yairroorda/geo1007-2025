// Define the main function
var main = function () {
  "use strict";

  // Define a function to add a comment from the input box
  var addCommentFromInputBox = function () {
    // Initialize a variable for the new comment
    var newComment;

    // Check if the input box is not empty
    if (document.querySelector(".comment-input input").value !== "") {
      // Create a new paragraph element for the comment
      newComment = document.createElement("p");
      // Set the text of the comment to the value of the input box
      newComment.textContent = document.querySelector(
        ".comment-input input"
      ).value;
      // Initially hide the comment
      newComment.style.display = "none";
      // Append the new comment to the comments section
      document.querySelector(".comments").appendChild(newComment);
      // Show the comment
      newComment.style.display = "";
      // Clear the input box
      document.querySelector(".comment-input input").value = "";
    }
  };

  // Add a click event listener to the button
  document
    .querySelector(".comment-input button")
    .addEventListener("click", function (event) {
      // Call the function to add a comment when the button is clicked
      addCommentFromInputBox();
    });

  // Add a keypress event listener to the input box
  document
    .querySelector(".comment-input input")
    .addEventListener("keypress", function (event) {
      // Check if the key pressed was the Enter key
      if (event.keyCode === 13) {
        // Call the function to add a comment when the Enter key is pressed
        addCommentFromInputBox();
      }
    });
};

// Call the main function when the document is ready
document.addEventListener("DOMContentLoaded", main);
