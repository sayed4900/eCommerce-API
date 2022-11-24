const catchAsync = require('../utils/catchAsync');
const Product = require('../models/productModel');
// const AppError = require('../utils/appError');

const factory = require('./handleFactory');

// exports.getAllProducts = catchAsync(async (req, res, next) => {
//   console.log(req.query);

//   const queryStr = { ...req.query };
//   const page = req.query.page * 1 || 1;
//   const limit = req.query.limit * 1 || 5;
//   const skip = (page - 1) * limit;

//   const products = await Product.find(req.query).sort();

//   res.status(200).json({
//     status: 'success',
//     results: products.length,
//     data: {
//       data: products,
//     },
//   });
// });

exports.getAllProducts = factory.getAll(Product);
exports.createProduct = factory.createOne(Product);
exports.getProduct = factory.getOne(Product, 'reviews');
// exports.getProduct = catchAsync(async (req, res) => {
//   const product = await Product.findById(req.params.id).populate('reviews');

//   if (!product) {
//     return next(new AppError('No doc found with that ID', 404));
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       data: product,
//     },
//   });
// });

exports.deleteProduct = factory.deleteOne(Product);
exports.updateProduct = factory.updateOne(Product);

exports.getProductStats = catchAsync(async (req, res, next) => {
  const stats = await Product.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$name' },
        numberOfSells: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    // {
    //   $match: { _id: { $ne: 'EASY' } }
    // }
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});
