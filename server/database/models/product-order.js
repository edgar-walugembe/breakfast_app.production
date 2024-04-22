"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductOrder extends Model {
    static associate(models) {
      ProductOrder.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });

      ProductOrder.belongsTo(models.Order, {
        foreignKey: "orderId",
        as: "order",
      });
    }
  }
  ProductOrder.init(
    {
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Order",
          key: "orderId",
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
      modelName: "ProductOrder",
      tableName: "product-orders",
      timestamps: true,
    }
  );
  return ProductOrder;
};
