import { Model, DataTypes, Sequelize, Association } from "sequelize";
import { User } from "./user";

interface NotificationAttributes {
  id?: number;
  name?: string;
  content?: string;
  time?: Date;
}

export class Notification
  extends Model<NotificationAttributes>
  implements NotificationAttributes
{
  public id!: number;
  public name!: string;
  public content!: string;
  public time!: Date;

  public static associations: {
    user: Association<Notification, User>;
  };

  public static associate(models: any) {
    Notification.belongsTo(models.Project, { foreignKey: "project_id" });
    Notification.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

export const initializeNotification = (sequelize: Sequelize) => {
  Notification.init(
    {
      name: DataTypes.STRING,
      content: DataTypes.TEXT,
      time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      modelName: "Notification",
      tableName: "notifications",
      timestamps: false,
    }
  );

  return Notification;
};
