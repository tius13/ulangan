const marketsService = require('./market-service');

/**
 * Handle get list of users request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */

async function getAllProducts(request, response, next) {
  try {
    const products = await marketsService.getAllProducts();
    return response.status(200).json(products);
  } catch (error) {
    return next(error);
  }
}

async function getProduct(request, response, next) {
  try {
    const productId = request.params.id;
    const product = await marketsService.getProduct(productId);
    return response.status(200).json(product);
  } catch (error) {
    return next(error);
  }
}

async function createProduct(request, response, next) {
  try {
    const { name, description, price, stock } = request.body;
    const newProduct = await marketsService.createProduct(name, description, price, stock);
    return response.status(201).json(newProduct);
  } catch (error) {
    return next(error);
  }
}

async function updateProduct(request, response, next) {
  try {
    const productId = request.params.id;
    const { name, description, price, stock } = request.body;
    const updatedProduct = await usersService.updateProduct(productId, name, description, price, stock);
    return response.status(200).json(updatedProduct);
  } catch (error) {
    return next(error);
  }
}

async function deleteProduct(request, response, next) {
  try {
    const productId = request.params.id;
    await usersService.deleteProduct(productId);
    return response.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    return next(error);
  }
}const marketService = require('./market-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getAllProducts(request, response, next) {
  try {
    const products = await marketService.getAllProducts();
    return response.status(200).json(products);
  } catch (error) {
    return next(error);
  }
}

async function getProduct(request, response, next) {
  try {
    const productId = request.params.id;
    const product = await marketService.getProduct(productId);
    return errorResponder.status(200).json(product);
  } catch (error) {
    return next(error);
  }
}

async function createProduct(request, response, next) {
  try {
    const { name, description, price, stock } = request.body;
    const newProduct = await marketService.createProduct(name, description, price, stock);
    return response.status(201).json(newProduct);
  } catch (error) {
    return next(error);
  }
}

async function updateProduct(request, response, next) {
  try {
    const productId = request.params.id;
    const { name, description, price, stock } = request.body;
    const updatedProduct = await marketService.updateProduct(productId, name, description, price, stock);
    return response.status(200).json(updatedProduct);
  } catch (error) {
    return next(error);
  }
}

async function deleteProduct(request, response, next) {
  try {
    const productId = request.params.id;
    await marketService.deleteProduct(productId);
    return response.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};


module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};