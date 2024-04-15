"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Finances extends Model {
    static associate(models) {
      // define association here
    }
  }
  Finances.init(
    {
      recordId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      currentDebt: DataTypes.INTEGER,
      paidDebt: DataTypes.INTEGER,
      balance: DataTypes.INTEGER,
      status: DataTypes.STRING,
      adminId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Finances",
      timestamps: true,
    }
  );
  return Finances;
};
