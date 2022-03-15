const { Schema } = require('mongoose');
const Category = require('../models/category');

// Display list of all Category
exports.category_list = async (req, res, next) => {
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
