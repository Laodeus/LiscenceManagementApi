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


const createLicenceRoute = require("./routes/create-licence");
const listLicenceRoute = require("./routes/list-licence");
const deleteLicenceRoute = require("./routes/delete-licence");
const modifyDataLicenceRoute = require("./routes/modify-data-licence");

//init
const app = express();
const urlParse = bodyParser.urlencoded({ extended: true })


app.get("/", indexPageRoute); // new user routes

app.post("/user", urlParse, signUpRoute); // new user routes
app.post("/login",urlParse, loginRoute); // login routes
app.delete("/user",urlParse, deleteUserRoute); // paranoid user delete with admin right
app.put("/user",urlParse, modifyUserRoute); // user modification with admin right

app.post("/licence", urlParse, createLicenceRoute); // new liscence routes
app.get("/licence", urlParse, listLicenceRoute); // new liscence routes
app.delete("/licence",urlParse, deleteLicenceRoute); // paranoid user delete with admin right
app.put("/licence",urlParse, modifyDataLicenceRoute); // paranoid user delete with admin right

// 404 handle
app.use(function(req, res, next){
  res.status(404);
  indexPageRoute(req, res, next)
});


app.listen(port, () => {
  console.clear();
  console.log("Here we go");
}); 