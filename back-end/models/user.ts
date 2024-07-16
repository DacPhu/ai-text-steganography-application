import { Model, DataTypes, Sequelize, Association } from "sequelize";// Adjust the import according to your setup
import { Notification } from "./notification";

interface UserAttributes {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  date_of_birth?: Date;
  address?: string;
  phone_number?: string;
  profile_picture?: string;
  created_at?: Date;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public password!: string;
  public date_of_birth?: Date;
  public address?: string;
  public phone_number?: string;
  public profile_picture?: string;
  public created_at!: Date;

  public static associations: {
    notifications: Association<User, Notification>;
  };

  public static associate(models: any) {
    User.belongsTo(models.Role, { foreignKey: "role_id" });
    User.hasMany(models.Project, { foreignKey: "project_manager_id" });
    User.hasMany(models.Member, { foreignKey: "user_id" });
    User.hasMany(models.Notification, { foreignKey: "user_id" });
  }
}

export const initializeUser = (sequelize: Sequelize) => {
  User.init(
    {
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      date_of_birth: DataTypes.DATE,
      address: DataTypes.TEXT,
      phone_number: DataTypes.STRING,
      profile_picture: DataTypes.STRING,
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: false,
    }
  );

  return User;
};
