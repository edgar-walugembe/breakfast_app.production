const { Product, Sequelize, sequelize } = require("../database/models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// create new product
async function createProduct(req, res) {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    const product = await Product.create({
      ...req.body,
    });

    return res.status(201).set(headers).send({ product });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ err });
  }
}

// get all products
async function fetchAllProducts(req, res) {
  try {
    const products = await Product.findAll();
    return res.status(200).send({ products });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ err });
  }
}

// delete a product
async function deleteProduct(req, res, next) {
  try {
    const productId = req.query.productId;

    const product = await Product.findOne({ where: { productId: productId } });
    if (product) {
      await product.destroy();
      return res
        .status(202)
        .send(`product id: ${productId} deleted successfully`);
    } else {
      return res.status(404).send(`product id: ${productId} not found`);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ err });
  }
}

// edit a product
async function editProduct(req, res, next) {
  try {
    const productId = parseInt(req.query.productId);

    const editedData = req.body;

    const [editedRows] = await Product.update(editedData, {
      where: { productId: productId },
    });

    const editedProduct = await Product.findOne({
      where: { productId: productId },
    });

    if (editedRows === 0) {
      return res.status(304).send(`product id: ${productId} not changed`);
    } else {
      return res.status(202).send({
        message: `product id: ${productId} updated successfully`,
        product: editedProduct,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error });
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
};
