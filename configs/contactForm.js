const scriptURL =
  "https://script.google.com/macros/s/AKfycbzOBqiB-e5W3jRXtlrnfAOLp1afvHtz08ypxD0soISsS2BW0eMrjJxSUq_lZMhx3eIFew/exec";
const form = document.forms["submit-contact-form"];
const tagForm = document.getElementsByClassName("contact-form")[0];
const submitButton = document.getElementById("form-submit-btn");

// Toast Message JS
function toastMessage(response) {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");

  if (response === "success") {
    x.innerText = "Thank you, your message successfully sended";
    x.className = "show";
  } else if (response === "failed") {
    x.innerText = "Sorry, Something is wrong at the moment";
    x.className = "show alert";
  }
  // Add the "show" class to DIV

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    x.className = x.className = "";
  }, 2900);
}

// Form Submit process
form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitButton.disabled = true;
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      tagForm.reset();
      submitButton.disabled = false;
      toastMessage("success");
    })
    .catch((error) => {
      console.error("Error!", error.message);
      submitButton.disabled = false;
      toastMessage("failed");
    });
});
