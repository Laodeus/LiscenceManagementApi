const secquelizeConnection = require("./../query/database-connection");
const autenticate = require("./../auth/authverif");
const passphrase = process.env.passphrase;

const deleteUser = async (req, res, next) => {
  id = req.body.id || null;
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

  if (trustedUser.id == id || trustedUser.role === "admin") {
    try {
      const deletion = await secquelizeConnection.User.update(
        { role: "deleted" },
        {
          where: {
            id: id
          }
        }
      );
      if(deletion[0] == 0){

        res.send(
            JSON.stringify({ error: `User ${id} do not exist` })
          );
      }
      res.end(JSON.stringify({ confirmation: `User ${id} deleted` }));
    } catch (err) {
      res.end(JSON.stringify({ error: err.message }));
    }
  } else {
    res.send(
      JSON.stringify({ error: "Deleted id must be you or you must be admin." })
    );
  }
};

module.exports = deleteUser;
