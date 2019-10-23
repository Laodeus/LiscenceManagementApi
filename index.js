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



app.post("/user", urlParse, signUpRoute);
app.get("/user",urlParse, loginRoute);
app.delete("/user",urlParse,jsonParse, deleteUserRoute)




app.listen(3000, () => {
  console.clear();
  console.log("Here we go");
}); 