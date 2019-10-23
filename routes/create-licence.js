const secquelizeConnection = require("./../query/database-connection");
const autenticate = require("./../auth/authverif");
const passphrase = process.env.passphrase || "maPassphraseSuperSecure";

const createLiscence = async (req, res, next) => {
  id = req.body.id || null;
  email = req.body.email || null;
  password = req.body.password || null;
  role = req.body.role || null; // admin only
  name = req.body.name || null; // admin only

  const trustedUser = await autenticate(req, res, passphrase, [
    "user",
    "admin"
  ]);

  

  // try {
  //   if (trustedUser.id != id) {
  //     if (trustedUser.role != "admin") {
  //       res.send(
  //         JSON.stringify({
  //           error: "modifying id must be you or you must be admin."
  //         })
  //       );
  //     }
  //   }
  // } catch (err) {
  //   res.end(JSON.stringify({ error: err.message }));
  // }
 
}

module.exports = createLiscence;
