const { Schema, model } = require('mongoose');

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

CategorySchema.virtual('url').get(function () {
  return '/category/' + this._id;
});

module.exports = model('category', CategorySchema);
