var email = true;
var phone = true;
function checkFields(){
  if(!email || !phone){
    document.getElementById("employee-submit").setAttribute("disabled", "disabled");
  }else{
    document.getElementById("employee-submit").removeAttribute("disabled");
  }
}

// TNode Validations
bootstrapValidate("#email", "email:Enter a valid E-Mail!", function(isValid){
  if(isValid){
    email = true;
  }else{
    email = false;
  }
  checkFields();
});
bootstrapValidate("#phone", "numeric:Please only enter numeric characters!", function(isValid){
  if(isValid){
    phone = true;
  }else{
    phone = false;
  }
  checkFields();
});
bootstrapValidate(
  "#search",
  "alphanum:Please only enter alphanumeric characters!"
);

// Login Validations
bootstrapValidate("#input-username", "required:This field is required!");
bootstrapValidate("#input-password", "required:This field is required!");
