const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Role = sequelize.define(
  "role",
  {
    rolename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false, // timestamps özelliğini false olarak ayarla
  }
);

module.exports = Role;
