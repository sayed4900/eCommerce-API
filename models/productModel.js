const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    price: {
      type: String,
      required: [true, 'Please provide a price'],
    },
    quantity: {
      type: Number,
      default: 1,
    },
    description: {
      type: String,
      trim: true,
    },
    slug: String,
    secretProduct: {
      type: Boolean,
      default: false,
    },
    categories: {
      type: Array,
    },
    brand: {
      type: String,
      default: 'SA',
    },
    rating: {
      type: String,
      default: 4.5,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10, // we *10 and /10 because round return integers values only
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    img: {
      type: String,
    },
    // child referceing
    consumers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    // reviews: [{ type: mongoose.Schema.ObjectId, ref: 'Review' }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// Virtual populate
productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

// VIRTUAL MIDDLEWARE
// productSchema.virtual('dicount').get(function () {
//   return this.price / 10;
// });

// DOCUMENT MIDDLEWARE
productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'consumers',
    select: 'name',
  });
  next();
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
