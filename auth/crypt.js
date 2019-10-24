const bcrypt = require("bcrypt");

const crypt = async (mdp) =>{
    const saltRounds  = 10;
    const hashed = await bcrypt.hash(mdp,saltRounds);
    return hashed;
}

const compare = async (userProvided, bddPulled ) =>{

    result = await bcrypt.compare(userProvided, bddPulled);
    return result
}

module.exports = {crypt,compare}