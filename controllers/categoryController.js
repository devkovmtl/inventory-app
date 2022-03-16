const { Schema } = require('mongoose');
const Category = require('../models/category');

// Get all the categories
exports.categoryList = async (req, res, next) => {
  try {
    const list_categories = await Category.find({});
    res.render('category_list', {
      title: 'Categories',
      categories_list: list_categories,
    });
  } catch (error) {
    return next(error);
  }
};

// Get category details
exports.categoryDetail = async (req, res, next) => {
  const categoryId = Schema.Types(req.params.id);
  res.send('NOT IMPLEMENTED: category details ' + categoryId);
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
