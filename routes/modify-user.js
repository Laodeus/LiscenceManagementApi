const secquelizeConnection = require("./../query/database-connection");
const autenticate = require("./../auth/authverif");
const passphrase = process.env.passphrase || "maPassphraseSuperSecure";

const modifyUser = async (req, res, next) => {
  id = req.body.id || null;
  email = req.body.email || null;
  password = req.body.password || null;
  role = req.body.role || null; // admin only
  name = req.body.name || null;

  try {
    if (!id) {
      throw new Error("an id must be provided.");
    }
  } catch (err) {
    res.end(JSON.stringify({ error: err.message }));
  }

  const trustedUser = await autenticate(req, res, passphrase, [
    "user",
    "admin"
  ]);

  try {
    if (trustedUser.id != id) {
      if (trustedUser.role != "admin") {
        res.send(
          JSON.stringify({
            error: "modifying id must be you or you must be admin."
          })
        );
      }
    }
  } catch (err) {
    res.end(JSON.stringify({ error: err.message }));
  }
  try {
    if (!!role && trustedUser.role != "admin") {
      res.send(
        JSON.stringify({
          error: `Only admin can modify a user role to ${role}`
        })
      );
    }
  } catch (err) {
    res.end(JSON.stringify({ error: err.message }));
  }

  let modificationobject = {};
  if (email) {
    modificationobject = Object.assign(modificationobject, {email:email});
  }
  if (password) {
    modificationobject = Object.assign(modificationobject, {password:password});
  }
  if (role) {
    modificationobject = Object.assign(modificationobject, {role:role});
  }
  if (name) {
    modificationobject = Object.assign(modificationobject, {name:name});
  }

  try {
    const modification = await secquelizeConnection.User.update(
      modificationobject,
      {
        where: {
          id: id
        }
      }
    );
    console.log(modification[1]);
    if (modification[0] == 0) {
      res.send(JSON.stringify({ error: `User ${id} do not exist` }));
      res.end(JSON.stringify(modificationobject));
    }
    res.end(JSON.stringify({ confirmation: `User ${id} modified` }));
  } catch (err) {
    res.end(JSON.stringify({ error: err.message }));
  }
}

module.exports = modifyUser;
