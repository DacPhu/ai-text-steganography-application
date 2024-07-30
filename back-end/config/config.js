require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    host: "localhost",
    dialect: "postgresql",
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "localhost",
    dialect: "postgresql",
  },
  production: {
    username: "dacphu",
    password: "dacphu",
    database: "db-text-steganography",
    port: 5432,
    host: "databasePostgres",
    dialect: "postgres",
  },
};
