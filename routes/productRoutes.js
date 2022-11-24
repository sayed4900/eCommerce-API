const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
// const reviewController = require('../controllers/reviewController');
const reviewRouter = require('../routes/reviewRoutes');

const router = express.Router();

// router
//   .route('/:productId/reviews')
//   .post(
//     authController.protect,
//     reviewController.setProductIds,
//     reviewController.createReview
//   );

router.use('/:productId/reviews', reviewRouter); //priduct router should user review router in case ever encounters a route like /:productId/reviews

router.route('/product-stats').get(productController.getProductStats);
router
  .route('/')
  .post(productController.createProduct)
  .get(productController.getAllProducts);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
