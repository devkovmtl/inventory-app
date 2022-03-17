const async = require('async');
const Brand = require('../models/brand');
const Product = require('../models/product');

// Get all the brands
exports.brandList = async (req, res, next) => {
  try {
    const list_brands = await Brand.find({}).sort('name').exec();
    res.render('brand_list', { title: 'Brands', brand_list: list_brands });
  } catch (error) {
    next(error);
  }
};

// Get brand detail for a specific brand
exports.brandDetail = (req, res, next) => {
  async.parallel(
    {
      brand: function (callback) {
        Brand.findById(req.params.id).exec(callback);
      },
      brand_products: function (callback) {
        Product.find({ brand: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.brand === null) {
        const err = new Error('Brand not Found');
        err.status = 404;
        return next(err);
      }
      res.render('brand_detail', {
        title: 'Brand Detail',
        brand: results.brand,
        brand_products: results.brand_products,
      });
    }
  );
};

// Get form to create a brand
exports.brandCreateGet = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Brand Create Get');
};

// Handle the post to create brand
exports.brandCreatePost = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: brand create Post');
};

// Get form to delete a brand
exports.brandDeleteGet = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Brand Delete Get Page');
};

// Handle the post to delete brand
exports.brandDeletePost = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: brand Delete Post Page');
};

//  Display brand update form GET
exports.brandUpdateGet = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Brand Update GET Page');
};

// Display brand update form POST
exports.brandUpdatePost = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Brand Update POST Page');
};
