const express = require('express');
const marketControllers = require('./market-controller');
const celebrate = require('../../../core/celebrate-wrappers');
const marketValidator = require('./market-validator');
const authenticationMiddleware = require('../../middlewares/authentication-middleware');

const route = express.Router();

module.exports = (app) => {
  app.use('/market', route);

  route.get('/', authenticationMiddleware, marketControllers.getAllProducts);

  route.get('/:id', authenticationMiddleware, marketControllers.getProduct);

  route.post(
    '/',
    authenticationMiddleware,
    celebrate(marketValidator.createProduct),
    marketControllers.createProduct
  );

  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(marketValidator.updateProduct),
    marketControllers.updateProduct
  );

  route.delete('/:id', authenticationMiddleware, marketControllers.deleteProduct);
};
