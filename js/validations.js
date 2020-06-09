// TNode Validations
bootstrapValidate("#email", "email|required:Enter a valid E-Mail!");
bootstrapValidate(
  "#phone",
  "numeric|required:Please only enter numeric characters!"
);
bootstrapValidate(
  "#search",
  "alphanum|required:Please only enter alphanumeric characters!"
);

bootstrapValidate("#first_name", "required:This field is required!");
bootstrapValidate("#last_name_name", "required:This field is required!");

// Login Validations
bootstrapValidate("#input-username", "required:This field is required!");
bootstrapValidate("#input-password", "required:This field is required!");
