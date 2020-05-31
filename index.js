const express = require('express');
const app = express();
const user = require('./routes/user');
const auth = require('./middleware/auth');
const cors = require('./middleware/cors');

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/user", user);
app.use(auth);

app.listen(process.env.PORT || 3000, ()=>{
    console.log("server is running");
});