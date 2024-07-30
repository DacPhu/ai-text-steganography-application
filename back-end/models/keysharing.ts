"use strict";
import { Model } from "sequelize";

interface KeySharingAttributes {
  id: number;
  keyId: number;
  userId: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class KeySharing
    extends Model<KeySharingAttributes>
    implements KeySharingAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: number;
    keyId!: number;
    userId!: number;

    static associate(models: any) {
      KeySharing.belongsTo(models.SecretKey, {
        foreignKey: "keyId",
        targetKey: "id",
      });
      KeySharing.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
      });
    }
  }
  KeySharing.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      keyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "KeySharing",
    }
  );
  return KeySharing;
};
