// TNode Validations
bootstrapValidate("#email", "email:Enter a valid E-Mail!");
bootstrapValidate("#email", "required:This field is required");
bootstrapValidate("#phone", "numeric:Please only enter numeric characters!");
bootstrapValidate("#phone", "required:This field is required");
bootstrapValidate(
  "#search",
  "alphanum:Please only enter alphanumeric characters!"
);
bootstrapValidate("#search", "required:This field is required!");
bootstrapValidate("#first_name", "required:This field is required!");
bootstrapValidate("#last_name", "required:This field is required!");
bootstrapValidate("#address", "required:This field is required!");

// Login Validations
bootstrapValidate("#input-username", "required:This field is required!");
bootstrapValidate("#input-password", "required:This field is required!");
