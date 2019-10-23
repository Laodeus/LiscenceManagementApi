// module import
const express = require("express");
const bodyParser = require("body-parser");
// personal import

const signUpRoute = require("./routes/sign-up");
const loginRoute = require("./routes/login");
const deleteUserRoute = require("./routes/delete-user");
const modifyUserRoute = require("./routes/modify-user");

const createLiscenceRoute = require("./routes/create-licence");

//init
const app = express();
const jsonParse = bodyParser.json();
const urlParse = bodyParser.urlencoded({ extended: true })



app.post("/user", urlParse, signUpRoute); // new user routes
app.post("/login",urlParse, loginRoute); // login routes
app.delete("/user",urlParse, deleteUserRoute); // paranoid user delete with admin right
app.put("/user",urlParse, modifyUserRoute); // user modification with admin right

app.post("/liscence", urlParse, createLiscenceRoute); // new user routes


app.listen(3000, () => {
  console.clear();
  console.log("Here we go");
}); 