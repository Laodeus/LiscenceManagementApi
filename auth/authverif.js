const jsonWebToken = require("jsonwebtoken");
const passphrase = process.env.passphrase || "maPassphraseSuperSecure";
const sequelmiseConnectionObject = require("./../query/database-connection");

const Authverif = async (req, res, passphrase, role) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("Must provide a token");
    }
    if (req.headers.authorization.substring(0, 6) == !"bearer") {
      throw new Error("Must provide a bearer token");
    }
  } catch (err) {
    res.end(JSON.stringify({ error: err.message }));
  }

  const token = req.headers.authorization.substring(7);
  const decodedUserId = jsonWebToken.decode(token);
  console.log(decodedUserId);
  console.log(token);
  console.log(passphrase)
  const user = await sequelmiseConnectionObject.User.findOne({
    where: { id: decodedUserId.id }
  });

  if (user) {
    try {
      if (!role.includes(user.role) || role !== "all") {
        throw new Error("Not allowed for the role "+ user.role);
      }
    } catch (err) {
      res.end(
        JSON.stringify({
          error: err.message
        })
      );
    }
    return { id: user.id, role: user.role };
  } else {
    res.end(
      JSON.stringify({
        error: "Error while decoding token. Token must be invalid."
      })
    );
  }
};
module.exports = Authverif;
// const Authverif = async (ctx, passphrase, role) => {
//   console.log(!ctx)
//   if (role !== 'public') { // pass it t false to have the possibilities to test with gaphiQL
//     if (ctx.request.header.authorization) {
//       const decoded = await jsonWebToken.verify(
//         ctx.request.header.authorization,
//         passphrase
//       )
//       if (role.includes(decoded.role) || role === 'all') {
//         return decoded
//       } else {
//         throw new Error('unauthorised for ' + decoded.role + ' role')
//       }
//     } else {
//       throw new Error('unauthorised, please login or sign up')
//     }
//   } else {
//     return ({ id: 0, role: 'public' })
//   }
//
//
