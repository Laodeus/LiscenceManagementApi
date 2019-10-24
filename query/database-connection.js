const Sequelize = require("sequelize");
const bcrypt = require("./../auth/crypt")
const databaseurl = process.env.DATABASE_URL;
const sequelize = new Sequelize(
    databaseurl
);

// connection error handler
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

// model creation

const User = sequelize.define("user", {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    unique: 'compositeScoreIndex'
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Licence = sequelize.define("Licence", {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  liscence: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  owner_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  limit_time_validity: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status :{
    type: Sequelize.STRING,
    allowNull: false
  },
  data: {
    type: Sequelize.JSONB,
  }
});

// Note: using `force: true` will drop the table if it already exists
User.sync({ force: false }).then(async () => {
  // Now the `users` table in the database corresponds to the model definition
  return User.create({
    email: "admin@admin.admin",
    password: await bcrypt.crypt("ThisIsNotSecureEraseMeQuickPlease"),
    role: "admin"
  });
})

Licence.sync({ force: false })


module.exports = {
    sequelize,
    User,
    Licence
}
