"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // associate gets all the models so we can destructure from it
      // define association here
      // by default, if we don't pass the FK to look for, it will look for "modelPK" (e.g. "UserID")
      this.belongsTo(User, { foreignKey: "userId", as: "user" })
    }

    toJSON() {
      return { ...this.get(), id: undefined, userId: undefined } // get the fields of the object and override the ID
    }
  }
  Post.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: "posts",
      modelName: "Post"
    }
  )
  return Post
}
