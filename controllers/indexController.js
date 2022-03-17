const Category = require('../models/category');

exports.index = async (req, res, next) => {
  try {
    const list_categories = await Category.find({}).exec();
    res.render('index', { title: 'MyShop', category_list: list_categories });
  } catch (error) {
    return next(error);
  }
};
