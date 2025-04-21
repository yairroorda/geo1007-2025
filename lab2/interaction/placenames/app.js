var allFunctions = function () {
  "use strict";

  var createTableFromJsonResponse = function (data) {
    document.querySelector("main .forDebug").append(JSON.stringify(data));

    if (
      typeof data.postalcodes !== "undefined" &&
      data.postalcodes.length > 0
    ) {
      data.postalcodes.forEach(function (item) {
        var row = document.createElement("tr");
        row.style.display = "none";

        var placeName = document.createElement("td");
        placeName.textContent = item.placeName;
        placeName.dataset.col = "placeName";
        row.appendChild(placeName);

        var latitude = document.createElement("td");
        latitude.textContent = item.lat;
        latitude.dataset.col = "latitude";
        row.appendChild(latitude);

        var longitude = document.createElement("td");
        longitude.textContent = item.lng;
        longitude.dataset.col = "longitude";
        row.appendChild(longitude);

        document.querySelector("#resultsTable").appendChild(row);
        row.style.display = "";
      });
    } else {
      document.querySelector("main .messages").append("no results found");
    }
  };

  var getPlacenames_plain_javascript = function (
    postalcodeInput,
    countryInput
  ) {
    var baseUrl =
      "http://api.geonames.org/postalCodeLookupJSON?username=bktudelft";
    var params = "&postalcode=" + postalcodeInput + "&country=" + countryInput;
    var requestUrl = baseUrl + params;

    fetch(requestUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        createTableFromJsonResponse(data);
      })
      .catch(function () {
        document.querySelector("main .messages").append("connection error");
      });
  };

  var searchFromInput = function () {
    var postalcodeInput;
    var countryInput;

    if (document.querySelector("section#geonames input").value !== "") {
      postalcodeInput = document.querySelector("#postal").value;
      countryInput = document.querySelector("#countrySelect").value;

      var rows = document.querySelectorAll("#resultsTable tr");
      for (var i = 1; i < rows.length; i++) {
        rows[i].remove();
      }

      document.querySelector("main .messages").innerHTML = "";
      document.querySelector("main .forDebug").innerHTML = "";

      getPlacenames_plain_javascript(postalcodeInput, countryInput);
    } else {
      alert("Enter (first part of) postal code");
    }
  };

  document
    .querySelector("section#geonames button")
    .addEventListener("click", function (event) {
      searchFromInput();
    });

  document
    .querySelector("section#geonames input")
    .addEventListener("keypress", function (event) {
      if (event.keyCode === 13) {
        searchFromInput();
      }
    });
};

document.addEventListener("DOMContentLoaded", allFunctions);
