"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.User, {
        foreignKey: "productId",
        as: "users",
      });

      Product.belongsToMany(models.Order, {
        through: models.ProductOrder,
        foreignKey: "productId",
        otherKey: "orderId",
        as: "products",
      });
    }
  }
  Product.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      unitPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isPositive(value) {
            if (value <= 0) {
              throw new Error("Price value must be a positive integer.");
            }
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
      modelName: "Product",
      tableName: "products",
      timestamps: true,
    }
  );
  return Product;
};
