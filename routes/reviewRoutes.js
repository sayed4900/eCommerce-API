const express = require('express');

const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController.js');

//each router only have access to the parameters of their specific routes, and need access to productId so we user mergeParams:true option
//

const router = express.Router({ mergeParams: true });

// POST reviews/
// POST /:productId/reviews

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    reviewController.setProductIds,
    reviewController.createReview
  );

module.exports = router;
