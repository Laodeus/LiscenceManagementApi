const secquelizeConnection = require("./../query/database-connection");
const autenticate = require("./../auth/authverif");
const passphrase = process.env.passphrase;

const modifyData = async (req, res, next) => {

  id = req.body.id || null;
  clear = req.body.clear || null;
  deletedata = req.body.delete || false;
  add = req.body.add || null;

  const trustedUser = await autenticate(req, res, passphrase, [
    "user",
    "admin"
  ]);

  try {
    if (!id) {
      throw new Error("an id must be provided.");
    }
  } catch (err) {
    res.end(JSON.stringify({ error: err.message }));
  }

  const retrievedLicence = await secquelizeConnection.Licence.findOne({
    where: { id: id }
  });

  try {
    if (!retrievedLicence) {
      throw new Error("invalid licence id");
    }
  } catch (err) {
    res.end(JSON.stringify({ error: err.message }));
  }

  const retrievedData = retrievedLicence.data;

  try {
    if (trustedUser.id !== retrievedLicence.owner_id) {
      if (trustedUser.role !== "admin") {
        throw new Error("provided id must be your's or you must be admin");
      }
    }
  } catch (err) {
    res.end(JSON.stringify({ error: err.message }));
  }

  let newDataObject = Object.assign({}, retrievedData);
  if (clear) {
    newDataObject = {};
  }

  if (deletedata) {
    let ParsedDelete;
    let returnDeleted = [];

    try {
      ParsedDelete = JSON.parse(deletedata);
      ParsedDelete = Array.from(ParsedDelete);
      if (!Array.isArray(ParsedDelete)) {
        throw new Error("invalid array");
      }
    } catch (err) {
      res.end(
        JSON.stringify({
          error:
            "Add object provided is invalid. " +
            err
        })
      );
    }
    ParsedDelete.forEach((element)=>{
      if(newDataObject[element]){
        delete newDataObject[element];
        returnDeleted.push(`key "${element} deleted from the data."`)
      }
      else
      {
        returnDeleted.push(`key ${element} not found in the data."`)
      }
    });

    newDataObject = Object.assign(newDataObject, {deleted:returnDeleted});
  }

  if (add) {
    let parsedAdd;

    try {
      parsedAdd = JSON.parse(add);
      if (typeof parsedAdd != "object") {
        throw new Error(
          "Add object provided is invalid. please, read the documentation."
        );
      }
    } catch (err) {
      res.end(
        JSON.stringify({
          error:
            "Add object provided is invalid. please, read the documentation."
        })
      );
    }
    newDataObject = Object.assign(newDataObject, parsedAdd);
  }

  res.end(JSON.stringify({ newData: newDataObject }));
  try {
    await secquelizeConnection.Licence.update(
      { data: newDataObject },
      {
        where: {
          id: id
        }
      }
    );
  } catch (err) {
    res.end(JSON.stringify({ error: err.message }));
  }
};

module.exports = modifyData;
