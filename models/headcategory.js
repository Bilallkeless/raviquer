const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Headcategory = sequelize.define(
  "headcategory",
  {
    headcategoryid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false, // timestamps özelliğini false olarak ayarla
  }
);

module.exports = Headcategory;
