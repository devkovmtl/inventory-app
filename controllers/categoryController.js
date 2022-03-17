const async = require('async');
const Category = require('../models/category');
const Product = require('../models/product');

// Get all the categories
exports.categoryList = async (req, res, next) => {
  try {
    const list_categories = await Category.find({});
    res.render('category_list', {
      title: 'Categories',
      category_list: list_categories,
    });
  } catch (error) {
    return next(error);
  }
};

// Get category details
exports.categoryDetail = (req, res, next) => {
  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.params.id).exec(callback);
      },
      category_products: function (callback) {
        Product.find({ category: { $all: [req.params.id] } }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.category === null) {
        const err = new Error('Category not found');
        err.status = 404;
        return next(err);
      }
      res.render('category_detail', {
        title: 'Category Detail',
        category: results.category,
        category_products: results.category_products,
      });
    }
  );
};

exports.categoryCreateGet = async (req, res, next) => {
  try {
    res.render('category_form', {
      title: 'Create Category',
      errors: [],
      category: null,
    });
  } catch (error) {
    return next(error);
  }
};

exports.categoryCreatePost = async (req, res, next) => {
  try {
    console.log(req.body);
    res.redirect('/category');
  } catch (error) {
    return next(error);
  }
};

exports.categoryUpdateGet = async (req, res, next) => {
  res.send('Not Implemented: Category Update Get');
};

exports.categoryUpdatePost = async (req, res, next) => {
  res.send('Not implemented: Category Update Post');
};

exports.categoryDeleteGet = async (req, res, next) => {
  res.send('Not Implemented: Category get Delete form');
};

exports.categoryDeletePost = async (req, res, next) => {
  res.send('Not implemented: Category get Delete form');
};
