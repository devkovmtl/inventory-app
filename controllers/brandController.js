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
        res.redirect('/myShop/brands');
      }
      res.render('admin/brand_delete', {
        title: 'Delete Brand',
        brand: results.brand,
        brand_products: results.brand_products,
        errors: null,
      });
    }
  );
};

// Handle the post to delete brand
// params will be submitted by the hidden input in our form
exports.brandDeletePost = async (req, res, next) => {
  async.parallel(
    {
      brand: function (callback) {
        Brand.findById(req.body.brandid).exec(callback);
      },
      brand_products: function (callback) {
        Product.find({ brand: req.body.brandid }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      // check if we have products to tell client to first delete the products
      if (results.brand_products.length > 0) {
        // Brand has product
        res.render('admin/brand_delete', {
          title: 'Delete Brand',
          brand: results.brand,
          brand_products: results.brand_products,
        });
        return;
      } else {
        Brand.findByIdAndRemove(req.body.brandid, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect('/myShop/brands');
        });
      }
    }
  );
};

//  Display brand update form GET
exports.brandUpdateGet = async (req, res, next) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      res.redirect('/myShop/brand/create');
      return;
    }
    res.render('admin/brand_form', {
      title: 'Update Brand',
      brand: brand,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
};

// Display brand update form POST
exports.brandUpdatePost = [
  body('name', 'Brand name is required').trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const brand = new Brand({
      name: req.body.name,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values error mesages
      res.render('admin/brand_form', {
        title: 'Update Brand',
        brand,
        errors: errors.array(),
      });
      return;
    } else {
      Brand.findByIdAndUpdate(req.params.id, brand, {}, (err, updateBrand) => {
        console.log('UPDATE BRAND ', updateBrand);
        if (err) {
          return next(err);
        }
        res.redirect(updateBrand.url);
      });
    }
  },
];
