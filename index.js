// module import
const express = require("express");
const bodyParser = require("body-parser");
const signUpRoute = require("./routes/sign-up");
const loginRoute = require("./routes/login");
const deleteUserRoute = require("./routes/delete-user");
// personal import
const authentification = require("./auth/authverif");

//init
const app = express();
const jsonParse = bodyParser.json();
const urlParse = bodyParser.urlencoded({ extended: true })



app.post("/signup", urlParse, signUpRoute);
// app.post("/login", loginRoute);
// app.post("/login/:id/", deleteUserRoute);

app.listen(3000, () => {
  console.clear();
  console.log("Here we go");
});