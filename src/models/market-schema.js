const { string } = require("joi");

const marketSchema = {
  nameProduct: String,
  description: String,
  price: String,
  stock: String,
}

module.exports = marketSchema;