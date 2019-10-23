const secquelizeConnection = require("./../query/database-connection");
const jwt = require("jsonwebtoken");
const passphrase = process.env.passphrase || "maPassphraseSuperSecure";

const login = async (req, res, next) => {
  console.clear();

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
    where: { email: email, password: password }
  });

  if (user) {
    console.log(passphrase);
    const token = jwt.sign({ id: user.dataValues.id }, passphrase);
    const userObject = {
      id: user.dataValues.id,
      email: user.dataValues.email,
      token: token
    };
    res.end(JSON.stringify(userObject));
  } else {
    res.end(JSON.stringify({ error: "Login failed" }));
  }
};

module.exports = login;
