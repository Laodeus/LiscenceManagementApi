const secquelizeConnection = require("./../query/database-connection");
const passphrase = process.env.passphrase || "maPassphraseSuperSecure";
const jwt = require("jsonwebtoken");
const signUp = async (req, res, next) => {
  console.clear();
  name = req.body.name || null;
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
    console.clear();
    console.log(err);
    res.end(JSON.stringify({ error: err.message }));
  }

  try {
    const user = await secquelizeConnection.User.create({
      name: name,
      email: email,
      role: "user", 
      password: password
    });

    const token = jwt.sign({ id: user.dataValues.id }, passphrase);
    const userObject = {
      id: user.dataValues.id,
      email: user.dataValues.email,
      token: token
    };
    res.end(JSON.stringify(userObject));
  } catch (err) {
      console.log(err)
    res.end(JSON.stringify({ error: "account already exist or previously deleted" }));
  }
};

module.exports = signUp;
