const jsonWebToken = require("jsonwebtoken");
const sequelmiseConnectionObject = require("./../query/database-connection");

const Authverif = async (req, res, passphrase, role) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("Must provide a token");
    } 
    if(req.headers.authorization.substring(0, 6) == !"bearer") {
      throw new Error("Must provide a bearer token");
    }
  } catch (err) {
    res.end(JSON.stringify({ error: err.message }));
  }

  const token = req.headers.authorization.substring(7);
  let decodedUserId;

  try {
     decodedUserId = jsonWebToken.verify(token,passphrase);
  } catch (err) {
    res.end(
      JSON.stringify({
        error: err.message
      })
    );
  }

  const user = await sequelmiseConnectionObject.User.findOne({
    where: { id: decodedUserId.id }
  });
  if (user) {
    try {
      if (!role.includes(user.role)) {
        if(role !== "all"){
          throw new Error("Not allowed for the role "+ user.role);
        }
      }
    } catch (err) {
      res.end(
        JSON.stringify({
          error: err.message
        })
      );
    }
    return { id: user.id, role: user.role, name:user.name, email: user.email };
  } else {
    res.end(
      JSON.stringify({
        error: "Error while decoding token. Token must be invalid or user do not exist anymore."
      })
    );
  }
}
module.exports = Authverif;