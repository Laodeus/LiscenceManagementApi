const uuidv4 = require('uuid/v4');
const { DateTime } = require("luxon");

const secquelizeConnection = require("./../query/database-connection");
const autenticate = require("./../auth/authverif");
const passphrase = process.env.passphrase || "maPassphraseSuperSecure";

const createLiscence = async (req, res, next) => {

  const trustedUser = await autenticate(req, res, passphrase, [
    "user",
    "admin"
  ]);

  id = req.body.id || trustedUser.id;

  const liscence_number = uuidv4();

  const liscenceObject = {
    liscence: liscence_number,
    owner_id: id,
    limit_time_validity : DateTime.local().plus(1, "year").endOf('day').toISO(),
    data:{}
  };

  try {
    const liscence = await secquelizeConnection.liscence.create(liscenceObject);
    res.end(JSON.stringify(liscenceObject));
  } catch (err) {
      console.log(err)
    res.end(JSON.stringify({ error: "Liscence already exist or previously deleted" }));
  }
}

module.exports = createLiscence;
