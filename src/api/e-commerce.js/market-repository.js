const { Market } = require('../../../models');


// api/components/products/productRepository.js

async function getAllProducts() {
  return Market.find({});
}

async function getProduct(productId) {
  return Market.findById(productId);
}

async function createProduct(name, description, price, stock) {
  return Market.create(name, description, price, stock);
}

async function updateProduct(productId, name, description, price, stock) {
  return Market.findByIdAndUpdate(productId, name, description, price, stock, { new: true });
}

async function deleteProduct(productId) {
  return Market.findByIdAndDelete(productId);
}

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
