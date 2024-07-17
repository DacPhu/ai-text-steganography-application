const { Sequelize } = require("sequelize");
require("dotenv").config();

const dbConfig = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  PORT: process.env.DB_PORT,
};

const { HOST, PORT, USER, PASSWORD, DB } = dbConfig;
const portNumber = parseInt(PORT);

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  port: portNumber,
  dialect: "postgres",
});
let models = require("../models");

models.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

models.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("All models synced successfully.");
  })
  .catch((err) => {
    console.error("Error syncing models:", err);
  });
