"use strict";

import { Model } from "sequelize";

interface EncryptionAttributes {
  id: number;
  userId: number;
  keyId: string;
  content: string;
  result: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Encryption
    extends Model<EncryptionAttributes>
    implements EncryptionAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: number;
    userId!: number;
    keyId!: string;
    content!: string;
    result!: string;
    static associate(models: any) {
      // define association here
      Encryption.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
      });
      Encryption.belongsTo(models.SecretKey, {
        foreignKey: "keyId",
        targetKey: "id",
      });
    }
  }
  Encryption.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      keyId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: DataTypes.STRING,
      result: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Encryption",
    }
  );
  return Encryption;
};
