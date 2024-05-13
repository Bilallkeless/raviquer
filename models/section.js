const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");
const Headcategory = require("./headcategory");
const Productcategory = require("./productcategory"); // Yeni eklendi

const Section = sequelize.define(
  "section",
  {
    sectionid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    baslik: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aciklama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fiyat: {
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
    productcategoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Section;
