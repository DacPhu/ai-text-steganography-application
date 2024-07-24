"use strict";
import { Model } from "sequelize";

interface SecretKeyAttributes {
  id: number;
  ownerId: number;
  name: string;
  live_time: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class SecretKey
    extends Model<SecretKeyAttributes>
    implements SecretKeyAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    ownerId!: number;
    name!: string;
    live_time!: number;

    static associate(models: any) {
      SecretKey.belongsTo(models.User, {
        foreignKey: "ownerId",
        targetKey: "id",
      });
      SecretKey.hasMany(models.KeySharing, {
        foreignKey: "keyId",
        sourceKey: "id",
      });
      SecretKey.hasMany(models.Encryption, {
        foreignKey: "keyId",
        sourceKey: "id",
      });
      SecretKey.hasMany(models.Decryption, {
        foreignKey: "keyId",
        sourceKey: "id",
      });
    }
  }
  SecretKey.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      live_time: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "SecretKey",
    }
  );
  return SecretKey;
};
