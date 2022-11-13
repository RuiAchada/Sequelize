"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
      this.hasMany(Post, { foreignKey: "userId", as: "posts" })
    }

    toJSON() {
      return { ...this.get(), id: undefined } // get the fields of the object and override the ID
    }
  }
  User.init(
    {
      // fields
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          //  there are multiple validation rules
          notNull: { msg: "User must have a name" }, // prevent sending null values
          notEmpty: { msg: "Name must not be empty" }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          //  there are multiple validation rules
          notNull: { msg: "User must have an email" }, // prevent sending null values
          notEmpty: { msg: "Email must not be empty" },
          isEmail: { msg: "Must be a valid email address" }
        }
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          //  there are multiple validation rules
          notNull: { msg: "User must have a role" }, // prevent sending null values
          notEmpty: { msg: "Role must not be empty" }
        }
      }
    },
    {
      // options
      sequelize,
      tableName: "users",
      modelName: "User"
    }
  )
  return User
}
