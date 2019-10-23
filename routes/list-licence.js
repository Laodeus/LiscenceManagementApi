const secquelizeConnection = require("./../query/database-connection");
const autenticate = require("./../auth/authverif");
const passphrase = process.env.passphrase || "maPassphraseSuperSecure";

const listLiscence = async (req, res, next) => {

  await autenticate(req, res, passphrase, ["admin"]);

  const id = req.body.id || null;
  const offset = req.body.offset || null;
  const limit = req.body.limit || 10;

  if (id) {
    const user = await secquelizeConnection.User.findOne({
      where: { id: id }
    });

    try {
      if (!user) {
        throw new Error("The id provided is not linked to an existing account");
      }
    } catch (err) {
      res.end(JSON.stringify({ error: err.message }));
    }
  }

  let request = {};

  if (id) {
    request = Object.assign(request, { where: { owner_id: id } });
  }
  if (offset) {
    request = Object.assign(request, { offset: offset });
  }
  if (limit) {
    request = Object.assign(request, { limit: limit });
  }

  const list = await secquelizeConnection.Licence.findAll(request);
  res.end(JSON.stringify(list));
}


module.exports = listLiscence;