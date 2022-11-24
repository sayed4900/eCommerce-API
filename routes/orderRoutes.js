const orderController = require('../controllers/orderController');
const authConroller = require('../controllers/authController');
// const catchAsync = require('../utils/catchAsync');
const router = require('express').Router();

router
  .route('/')
  .get(
    authConroller.protect,
    authConroller.restrictTo('admin'),
    orderController.getAllOrders
  )
  .post(
    authConroller.protect,
    // authConroller.restrictTo("user"),
    orderController.createOrder
  );

router.get('/income', orderController.income);
router
  .route('/:id')
  .delete(
    authConroller.protect,
    authConroller.restrictTo('admin'),
    orderController.deleteOrder
  )
  .get(authConroller.protect, orderController.getOrder)
  .patch(authConroller.protect, orderController.updateOrder);

module.exports = router;
