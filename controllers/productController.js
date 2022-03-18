const { body, validationResult } = require('express-validator');
const Product = require('../models/product');
const Brand = require('../models/brand');
const Category = require('../models/category');

exports.index = async (req, res, next) => {
  res.redirect('/');
};

// Get all the products
exports.productList = async (req, res, next) => {
  try {
    const list_products = await Product.find({}, '-description -numberInStock')
      .populate('brand category')
      .exec();
    res.render('product_list', {
      title: 'Product List',
      product_list: list_products,
    });
  } catch (error) {
    next(error);
  }
};

// Get product detail for a specific product
exports.productDetail = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('brand')
      .populate('category')
      .exec();
    if (product === null) {
      const err = new Error('Product not found');
      err.status = 404;
      return next(err);
    }
    res.render('product_detail', {
      title: 'Product detail',
      product: product,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
};

// Get form to create a product
exports.productCreateGet = (req, res, next) => {
  async.parallel(
    {
      brands: function (callback) {
        Brand.find(callback);
      },
      categories: function (callback) {
        Category.find(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render('admin/product_form', {
        title: 'Create Product',
        brands: results.brands,
        categories: results.categories,
        product: null,
        errors: null,
      });
    }
  );
};

// Handle the post to create product
exports.productCreatePost = [
  body('name', 'Product name is required').trim().isLength({ min: 1 }).escape(),
  body('description', 'Product description is required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('category', 'Product category is required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('price', 'Product price is required').trim().toFloat().escape(),
  body('numberInStock', 'Product stocke is required').trim().toFloat().escape(),
  (req, res, next) => {
    // extract validation errors
    const errors = validationResult(req);

    // create product
    const product = new Product({
      ...req.body,
    });

    if (!errors.isEmpty()) {
      // we have errors we need to the brand and category
      async.parallel(
        {
          brands: function (callback) {
            Brand.find(callback);
          },
          categories: function (callback) {
            Category.find(callback);
          },
        },
        (err, results) => {
          if (err) {
            return next(err);
          }
          res.render('admin/product_form', {
            title: 'Create Product',
            brands: results.brands,
            categories: results.categories,
            product,
            errors: errors.array(),
          });
        }
      );
    } else {
      product.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect(product.url);
      });
    }
  },
];

// Get form to delete a product
exports.productDeleteGet = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product Delete Get Page');
};

// Handle the post to delete product
exports.productDeletePost = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product Delete Post Page');
};

//  Display product update form GET
exports.productUpdateGet = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product Update GET Page');
};

// Display product update form POST
exports.productUpdatePost = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product Update POST Page');
};
