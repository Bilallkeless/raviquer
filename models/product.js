const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");
const Headcategory = require("./headcategory");
const Productcategory = require("./productcategory");

const Product = sequelize.define(
  "product",
  {
    productid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    headcategoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productcategoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    urunismi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fiyat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    urunaciklama: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    resim: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    detayresim1: {
      type: DataTypes.TEXT,
      defaultValue: null, // Varsayılan olarak NULL atanacak
    },
    detayresim2: {
      type: DataTypes.TEXT,
      defaultValue: null, // Varsayılan olarak NULL atanacak
    },
    detayresim3: {
      type: DataTypes.TEXT,
      defaultValue: null, // Varsayılan olarak NULL atanacak
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Product;
