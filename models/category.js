const { Schema, model } = require('mongoose');

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
    },
    imageUrl: {
      type: String,
    },
    parentCategory: {
      type: String,
      minlength: 1,
      maxlength: 100,
    },
  },
  { timestamps: true }
);

CategorySchema.virtual('url').get(function () {
  return '/myShop/category/' + this._id;
});

module.exports = model('Category', CategorySchema);
