const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");
const Headcategory = require("./headcategory");

const Splidecategory = sequelize.define(
  "splidecategory",
  {
    splidecategoryid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resim: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    headcategoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false, // timestamps özelliğini false olarak ayarla
  }
);

module.exports = Splidecategory;
