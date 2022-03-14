const { Schema, model } = require('mongoose');

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    descrition: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

ProductSchema.virtual('url').get(function () {
  return '/product/' + this._id;
});

module.exports = model('Product', ProductSchema);
