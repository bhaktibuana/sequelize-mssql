const { DataTypes, Op } = require("sequelize");
const { sequelize } = require("../../config");

const UserRole = sequelize.define(
  "UserRole",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    roleCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = {
  UserRole,
  sequelize,
  Op,
};
