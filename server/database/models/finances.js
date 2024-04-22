"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Finances extends Model {
    static associate(models) {
      // Finances.hasOne(models.User, {
      //   foreignKey: "recordId",
      //   as: "users",
      // });
    }
  }
  Finances.init(
    {
      recordId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currentDebt: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      paidDebt: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("cleared", "pending", "declined"),
        allowNull: false,
        validate: {
          isIn: {
            args: [["cleared", "pending", "declined"]],
            msg: "Invalid Status",
          },
        },
      },
      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Finances",
      tableName: "finances",
      timestamps: true,
    }
  );
  return Finances;
};
