import { Model, DataTypes, Sequelize } from "sequelize";

// Ensure you have the sequelize instance properly configured
const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: "your_username",
  password: "your_password",
  database: "your_database_name",
});

interface UserAttributes {
  id?: number;
  email: string;
  username: string;
  password: string;
  full_name: string;
  date_of_birth: Date;
  phone_number: string;
  institute: string;
  area_of_study: string;
  profile_picture: string;
  biography: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public username!: string;
  public password!: string;
  public full_name!: string;
  public date_of_birth!: Date;
  public phone_number!: string;
  public institute!: string;
  public area_of_study!: string;
  public profile_picture!: string;
  public biography!: string;

  static initModel(sequelize: Sequelize): void {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        full_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        date_of_birth: {
          type: DataTypes.DATE,
        },
        phone_number: {
          type: DataTypes.STRING,
        },
        institute: {
          type: DataTypes.STRING,
        },
        area_of_study: {
          type: DataTypes.STRING,
        },
        profile_picture: {
          type: DataTypes.STRING,
        },
        biography: {
          type: DataTypes.TEXT,
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true, // You can set this to true if you have timestamp fields like createdAt, updatedAt
        underscored: true, // Set to true if your database uses underscored naming convention
      }
    );
  }

  static async createUser(newUser: UserAttributes): Promise<User> {
    const user = await User.create(newUser);
    console.log("Created user:", user.toJSON());
    return user;
  }

  static async findUserById(id: number): Promise<User | null> {
    const user = await User.findByPk(id);
    if (user) {
      console.log("Found user:", user.toJSON());
    } else {
      console.log("User not found with id:", id);
    }
    return user;
  }

  static async updateUserById(
    id: number,
    updates: Partial<UserAttributes>
  ): Promise<[number, User[]]> {
    const [updatedRowsCount, updatedUsers] = await User.update(updates, {
      where: { id },
      returning: true,
    });
    console.log(`Updated ${updatedRowsCount} user(s)`);
    return [updatedRowsCount, updatedUsers];
  }

  static async deleteUserById(id: number): Promise<number> {
    const deletedRowCount = await User.destroy({
      where: { id },
    });
    console.log(`Deleted ${deletedRowCount} user(s)`);
    return deletedRowCount;
  }
}

User.initModel(sequelize); // Initialize the User model with Sequelize

export default User;
