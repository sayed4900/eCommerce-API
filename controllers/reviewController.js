const Review = require('../models/reviewModel.js');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handleFactory');

exports.setProductIds = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.getAllReviews = factory.getAll(Review);
// exports.getReview = factory.getOne(Review, 'reviews');
exports.getReview = catchAsync(async (req, res, next) => {
  const reviews = await Modal.findById(req.params.id).populate('reviews');

  if (!reviews) {
    return next(new AppError('No doc found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: reviews,
    },
  });
});

exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
