const secquelizeConnection = require("./../query/database-connection");
const autenticate = require("./../auth/authverif");
const passphrase = process.env.passphrase || "maPassphraseSuperSecure";

const deleteUser = async (req,res,next)=>{
    
    const trustedUser = await autenticate(req,res,passphrase,["user","admin"]);
    
    res.send(JSON.stringify(trustedUser, null, 2));
}

module.exports = deleteUser;