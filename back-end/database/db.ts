import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config";

// Define your database configuration
const { HOST, PORT, USER, PASSWORD, DB } = dbConfig;
const portNumber = parseInt(PORT!);

// Initialize Sequelize with PostgreSQL
const sequelize = new Sequelize(DB!, USER!, PASSWORD, {
  port: portNumber,
  dialect: "postgres",
});

// Check database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Sync all defined models to the database
sequelize
  .sync({ force: false }) // set force: true to drop existing tables and re-create them
  .then(() => {
    console.log("All models synced successfully.");
  })
  .catch((err) => {
    console.error("Error syncing models:", err);
  });

export default sequelize;
