const secquelizeConnection = require("./../query/database-connection");
const autenticate = require("./../auth/authverif");
const passphrase = process.env.passphrase || "maPassphraseSuperSecure";

const deleteLiscence = async (req, res, next) => {
  id = req.body.id || null;
  try {
    if (!id) {
      throw new Error("an id must be provided.");
    }
  } catch (err) {
    res.end(JSON.stringify({ error: err.message }));
  }

  await autenticate(req, res, passphrase, ["admin"]);

  try {
    const deletion = await secquelizeConnection.Licence.update(
      { status: "deleted" },
      {
        where: {
          id: id
        }
      }
    );
    console.log(deletion[1]);
    if (deletion[0] == 0) {
      res.send(JSON.stringify({ error: `Liscence id ${id} do not exist` }));
    }
    res.end(JSON.stringify({ confirmation: `Liscence ${id} deleted` }));
  } catch (err) {
    res.end(JSON.stringify({ error: err.message }));
  }
};

module.exports = deleteLiscence;
