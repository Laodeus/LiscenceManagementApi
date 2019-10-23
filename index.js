// module import
const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
// personal import

const signUpRoute = require("./routes/sign-up");
const loginRoute = require("./routes/login");
const deleteUserRoute = require("./routes/delete-user");
const modifyUserRoute = require("./routes/modify-user");
const indexPageRoute = require("./routes/index-page");


const createLiscenceRoute = require("./routes/create-licence");
const listLiscenceRoute = require("./routes/list-licence");
const deleteLiscenceRoute = require("./routes/delete-licence");

//init
const app = express();
const jsonParse = bodyParser.json();
const urlParse = bodyParser.urlencoded({ extended: true })


app.get("/", indexPageRoute); // new user routes

app.post("/user", urlParse, signUpRoute); // new user routes
app.post("/login",urlParse, loginRoute); // login routes
app.delete("/user",urlParse, deleteUserRoute); // paranoid user delete with admin right
app.put("/user",urlParse, modifyUserRoute); // user modification with admin right

app.post("/liscence", urlParse, createLiscenceRoute); // new liscence routes
app.get("/liscence", urlParse, listLiscenceRoute); // new liscence routes
app.delete("/liscence",urlParse, deleteLiscenceRoute); // paranoid user delete with admin right


app.listen(port, () => {
  console.clear();
  console.log("Here we go");
}); 