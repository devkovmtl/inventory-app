const { Schema } = require('mongoose');
const Product = require('../models/product');

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
exports.productCreateGet = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product Create Get');
};

// Handle the post to create product
exports.productCreatePost = async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product create Post');
};

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
