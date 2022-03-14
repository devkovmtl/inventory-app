const { Schema, model } = require('mongoose');

const BrandSchema = new Schema(
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
  },
  { timestamps: true }
);

BrandSchema.virtual('url').get(function () {
  return '/brand/' + this._id;
});

module.exports = model('Brand', BrandSchema);
