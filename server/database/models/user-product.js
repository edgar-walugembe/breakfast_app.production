"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserProduct extends Model {
    static associate(models) {
      UserProduct.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });

      UserProduct.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }
  UserProduct.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "userId",
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Product",
          key: "productId",
        },
      },
    },
    {
      sequelize,
      modelName: "UserProduct",
      tableName: "user-products",
      timestamps: true,
    }
  );
  return UserProduct;
};
