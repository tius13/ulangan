const logger = require('../src/core/logger')('api');
const { market } = require('../src/models/market');


const nameProduct = 'shampoo';
const description = 'for hair';
const price = '$5';
const stock = '2000';

logger.info('Creating default users');

(async () => {
  try {
    const numMarket = await market.countDocuments({
      nameProduct,
      description,
      price,
      stock,
    });

    if (numMarket > 0) {
      throw new Error(`product ${nameProduct} already exists`);
    }
    const product = await (market);
    await product.create({
      nameProduct,
      description,
      price,
      stock,
    });
  } catch (e) {
    logger.error(e);
  } finally {
    process.exit(0);
  }
})();
