const marketRepository = require('./market-repository');

async function getAllProducts() {
  return marketRepository.getAllProducts();
}

async function getProduct(productId) {
  return marketRepository.getProduct(productId);
}

async function createProduct(name, description, price, stock) {
  return marketRepository.createProduct({ name, description, price, stock });
}

async function updateProduct(productId, name, description, price, stock) {
  return marketRepository.updateProduct(productId, { name, description, price, stock });
}

async function deleteProduct(productId) {
  return marketRepository.deleteProduct(productId);
}

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
