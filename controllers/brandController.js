const async = require('async');
const { body, validationResult } = require('express-validator');
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
exports.brandCreateGet = (req, res, next) => {
  res.render('admin/brand_form', {
    title: 'Create Brand',
    brand: null,
    errors: null,
  });
};

// Handle the post to create brand
exports.brandCreatePost = [
  body('name', 'Brand name is required').trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    // extract validation errors from a request
    const errors = validationResult(req);

    // create brand object with escaped and trimmed data
    const brand = new Brand({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values error mesages
      res.render('admin/brand_form', {
        title: 'Create Brand',
        brand,
        errors: errors.array(),
      });
      return;
    } else {
      // Data form is valid
      Brand.findOne({ name: req.body.name }).exec((err, found_brand) => {
        if (err) {
          return next(err);
        }
        if (found_brand) {
          // Brand already exist redirect to brand detail page
          res.redirect(found_brand.url);
        } else {
          brand.save(function (err) {
            if (err) {
              return next(err);
            }
            // brand saved. redirect to brand detail
            res.redirect(brand.url);
          });
        }
      });
    }
  },
];

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
