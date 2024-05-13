const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Productcategory = sequelize.define(
  "productcategory",
  {
    productcategoryid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productcategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false, // timestamps özelliğini false olarak ayarla
  }
);

module.exports = Productcategory;
