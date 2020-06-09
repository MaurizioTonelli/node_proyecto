const express = require("express");
const app = express();
const user = require("./routes/user");
const employee = require("./routes/employee");
const auth = require("./middleware/auth");
const cors = require("./middleware/cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors);
app.use("/user", user);
app.use(auth);
app.use("/employees", employee);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
