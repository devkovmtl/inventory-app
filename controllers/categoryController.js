const async = require('async');
const { body, validationResult } = require('express-validator');
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
      list_categories: function (callback) {
        Category.find({}).exec(callback);
      },
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
        category_list: results.list_categories,
      });
    }
  );
};

exports.categoryCreateGet = async (req, res, next) => {
  try {
    res.render('admin/category_form', {
      title: 'Create Category',
      category: null,
      errors: null,
    });
  } catch (error) {
    return next(error);
  }
};

exports.categoryCreatePost = [
  body('name', 'Category name is required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    // extract validation errors
    const errors = validationResult(req);

    // create category object
    const category = new Category({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render('admin/category_form', {
        title: 'Create Category',
        category,
        errors: errors.array(),
      });
      return;
    } else {
      // Data form is valid
      Category.findOne({ name: req.body.name }).exec((err, found_category) => {
        if (err) {
          return next(err);
        }
        if (found_category) {
          res.redirect(found_category.url);
        } else {
          category.save(function (err) {
            if (err) {
              return next(err);
            }
            res.redirect(category.url);
          });
        }
      });
    }
  },
];

exports.categoryDeleteGet = (req, res, next) => {
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
        res.redirect('/myShop/categories');
      }
      res.render('admin/category_delete', {
        title: 'Delete Category',
        category: results.category,
        category_products: results.category_products,
        errors: null,
      });
    }
  );
};

exports.categoryDeletePost = (req, res, next) => {
  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.body.categoryid).exec(callback);
      },
      category_products: function (callback) {
        Product.find({ category: { $all: [req.body.categoryid] } }).exec(
          callback
        );
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      // check if we have product in category
      if (results.category_products.lenght > 0) {
        res.render('admin/category_delete', {
          title: 'Delete Category',
          category: results.category,
          category_products: results.category_products,
        });
        return;
      } else {
        Category.findByIdAndRemove(req.body.categoryid, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect('/myShop/categories');
        });
      }
    }
  );
};

exports.categoryUpdateGet = async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.redirect('/myShop/category/create');
    return;
  }
  res.render('admin/category_form', {
    title: 'Update Brand',
    category,
    errors: null,
  });
};

exports.categoryUpdatePost = [
  body('name', 'Category name is required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    // extract validation errors
    const errors = validationResult(req);

    // pass _id to not create new category
    const category = new Category({ name: req.body.name, _id: req.params.id });

    if (!errors.isEmpty()) {
      res.render('admin/category_form', {
        title: 'Create Category',
        category,
        errors: errors.array(),
      });
      return;
    } else {
      // Data form is valid
      Category.findByIdAndUpdate(
        req.params.id,
        category,
        {},
        (err, updateCategory) => {
          if (err) {
            return next(err);
          }
          res.redirect(updateCategory.url);
        }
      );
    }
  },
];
