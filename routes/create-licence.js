const uuidv4 = require("uuid/v4");
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

  const user = await secquelizeConnection.User.findOne({
    where: { id:id }
  });
  try {
    if(!user){
      throw new Error("The id provided is not linked to an existing account");
    }
    if(user.role == "deleted"){
      throw new Error("The id provided is  linked to a deleted account");
    }
  } catch (err) {
    res.end(JSON.stringify({ error: err.message }));
  }
  const liscence_number = uuidv4();

  const liscenceObject = {
    liscence: liscence_number,
    owner_id: id,
    limit_time_validity: DateTime.local()
      .plus({ years: 1 })
      .endOf("day")
      .toISO(),
    status : "active",
    data: {}
  };

  try {
    const liscence = await secquelizeConnection.Licence.create(liscenceObject);
    res.end(JSON.stringify(liscenceObject));
  } catch (err) {
    res.end(
      JSON.stringify({
        error:
          "an error occurred while creating the licence, please, retry, if it does not work, Contact an administrator"
      })
    );
  }
};

module.exports = createLiscence;
