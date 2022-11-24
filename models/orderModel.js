const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    // Parent referencing
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Order must be belong to user'],
    },
    // cartItems: [
    //   {
    //     products: {
    //       type: mongoose.Schema.ObjectId,
    //       ref: 'Product',
    //     },
    //     quantity: {
    //       type: Number,
    //       default: 1,
    //     },
    //   },
    // ],
    cartItems: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Order must be belong to product'],
      },
    ],

    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: 'pending' },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);
orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name email ',
  }).populate({
    path: 'cartItems',
    select: 'name price',
  });
  next();
});
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
