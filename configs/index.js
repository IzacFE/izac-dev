(function () {
  const controlButtons = document.querySelectorAll(".control");

  //#region the process off checking the page based on param
  const url = new URL(window.location.href);
  let page = url.searchParams.get("page") || "home"; // Default to 'home' if 'page' parameter is not provided
  url.searchParams.set("page", page); // Update URL with 'page' parameter
  window.history.replaceState(null, null, url); // Replace current history state with updated URL

  // Remove active state from previous active button
  document.querySelector(".active-btn").classList.remove("active-btn");

  // Find and set active state for the current page's control button

  controlButtons.forEach((button) => {
    if (button.dataset.id === page) {
      button.classList.add("active-btn");
    }
  });

  // Activate the current page
  document.getElementById(page).classList.add("active");
  //#endregion

  //#region Paging Event Process
  // Reset and change active buton
  function activeLink() {
    controlButtons.forEach((button) => {
      button.classList.remove("active-btn");
      this.classList.add("active-btn");
    });
  }
  controlButtons.forEach((button) => {
    button.addEventListener("click", activeLink);
  });

  // Change page and Url param
  controlButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const buttonId = button.dataset.id;
      document.querySelector(".active").classList.remove("active");
      document.getElementById(buttonId).classList.add("active");

      // Update the page URL
      url.searchParams.set("page", buttonId);

      window.history.replaceState(null, null, url);
    });
  });
  //#endregion

  //#region Light mode toogle process
  document.querySelector(".theme-btn").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
  });
  //#endregion

  //#region  Make the DIV element draggable:
  dragElement(document.getElementById("dragable"));

  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id + "Content")) {
      // if present, the Content is where you move the DIV from:
      document.getElementById(elmnt.id + "Content").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  //#endregion

  // text loop effect by continuously shifting the first character of a text to the end
  const textElement = document.getElementById("looping-text");
  const originalText = textElement.textContent;
  let currentText = originalText;

  setInterval(() => {
    substring = currentText.slice(0, 20);
    currentText = currentText.slice(20) + substring;
    textElement.textContent = currentText;
  }, 200); // Change this value to adjust the speed of the loop
})();
