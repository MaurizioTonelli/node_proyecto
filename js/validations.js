var email = true;
var phone = true;
window.onload = checkFields;

function checkFields() {
  if (!email || !phone) {
    document
      .getElementById("employee-submit")
      .setAttribute("disabled", "disabled");
  } else {
    if (document.getElementById("employee-submit").hasAttribute("disabled")) {
      document.getElementById("employee-submit").removeAttribute("disabled");
    }
  }
}

// TNode Validations
bootstrapValidate("#email", "email:Enter a valid E-Mail!", function (isValid) {
  if (isValid) {
    email = true;
    checkFields();
  } else {
    email = false;
  }
});
bootstrapValidate(
  "#phone",
  "numeric:Please only enter numeric characters!",
  function (isValid) {
    if (isValid) {
      phone = true;
      checkFields();
    } else {
      phone = false;
    }
  }
);
bootstrapValidate(
  "#search",
  "alphanum:Please only enter alphanumeric characters!"
);
