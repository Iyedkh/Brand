const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    images: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sizes: [
      {
        size: { type: String, required: true },
        stock: { type: Number, required: true, default: 0 },
      }
    ],
    colors: {
      type: [String],
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema],
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre('save', async function () {
  if (this.sizes && this.sizes.length > 0) {
    this.stock = this.sizes.reduce((acc, curr) => acc + (Number(curr.stock) || 0), 0);
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
