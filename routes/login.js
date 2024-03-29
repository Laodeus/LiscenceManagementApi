const secquelizeConnection = require("./../query/database-connection");
const jwt = require("jsonwebtoken");
const passphrase = process.env.passphrase;
const bcrypt = require ("./../auth/crypt")


const login = async (req, res, next) => {
  email = req.body.email || null;
  password = req.body.password || null;
  try {
    if (!email) {
      throw new Error("email must be provided.");
    }
    if (!password) {
      throw new Error("password must be provided.");
    }
  } catch (err) {
    res.end(JSON.stringify({ error: err.message }));
  }
  const user = await secquelizeConnection.User.findOne({
    where: { email: email}
  });


  if (user) {
    try {
      
    const pswdCompare = await bcrypt.compare(password,user.password);
    if(!pswdCompare){
        throw new Error("login Failed");
    }
    
  } catch (err) {
    res.end(JSON.stringify({ error: err.message }));
}

    const token = jwt.sign({ id: user.dataValues.id }, passphrase);
    const userObject = {
      id: user.dataValues.id,
      email: user.dataValues.email,
      token: token
    };
    if(user.role == "deleted"){
      res.end(JSON.stringify({ error: "account deleted Contact an administrator to reactive your account." }));
    }
    res.end(JSON.stringify(userObject));
  } else {
    res.end(JSON.stringify({ error: "Login failed" }));
  }
}

module.exports = login;
 