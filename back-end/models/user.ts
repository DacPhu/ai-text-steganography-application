"use strict";

const { Sequelize, Model, DataTypes } = require("sequelize");

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

module.exports = (sequelize: any, DataTypes: { INTEGER: any; STRING: any }) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    firstName!: string;
    lastName!: string;
    username!: string;
    email!: string;
    password!: string;

    static associate(models: any) {
      User.hasMany(models.SecretKey, {
        foreignKey: "ownerId",
        sourceKey: "id",
      });
      User.hasMany(models.Encryption, {
        foreignKey: "userId",
        sourceKey: "id",
      });
      User.hasMany(models.Decryption, {
        foreignKey: "userId",
        sourceKey: "id",
      });
      User.hasMany(models.KeySharing, {
        foreignKey: "userId",
        sourceKey: "id",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
