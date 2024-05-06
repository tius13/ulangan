const joi = require('joi');

module.exports = {
  createProduct: {
    body: {
      name: joi.string().required(),
      description: joi.string().required(),
      price: joi.number().min(0).required(),
      stock: joi.number().min(0).required(),
    },
  },
  updateProduct: {
    body: {
      name: joi.string(),
      description: joi.string(),
      price: joi.number().min(0),
      stock: joi.number().min(0),
    },
  },
};
