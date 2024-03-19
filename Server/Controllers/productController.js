const mongoose = require("mongoose");
const ProductModel = require("../Models/productSchema");

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    if (!products) {
      return res.status(404).send({ message: "No products found" });
    }
    res.send(products);
  } catch (error) {
    res
      .status(500)
      .send({
        message: "Error while getting all products",
        error: error.message,
      });
  }
};

// get product info by id
const getProductInfoById = async (req, res) => {
    const {id} = req.params
    try {
      const product = await ProductModel.findOne({id});
      res.status(200).json(product);
    } catch (error) {
      res.status(500).send({ message: "Error while getting product info", error:error.message });
    }
}

module.exports = {
  getAllProducts,
  getProductInfoById
};
